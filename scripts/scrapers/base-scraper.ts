/**
 * Base Scraper
 * 
 * Abstract base class for web scrapers with anti-detection and rate limiting
 */

export interface ScraperConfig {
  state: string
  baseUrl: string
  rateLimit: number // requests per minute
  timeout: number
  retryAttempts: number
}

export interface UCCFiling {
  filingNumber: string
  debtorName: string
  securedParty: string
  filingDate: string
  collateral: string
  status: 'active' | 'terminated' | 'lapsed'
  filingType: 'UCC-1' | 'UCC-3'
}

export interface ScraperResult {
  success: boolean
  filings?: UCCFiling[]
  error?: string
  searchUrl?: string
  timestamp: string
  retryCount?: number
  parsingErrors?: string[]
}

export abstract class BaseScraper {
  protected config: ScraperConfig

  constructor(config: ScraperConfig) {
    this.config = config
  }

  /**
   * Search for UCC filings
   */
  abstract search(companyName: string): Promise<ScraperResult>

  /**
   * Get manual search URL for fallback
   */
  abstract getManualSearchUrl(companyName: string): string

  /**
   * Validate search parameters
   */
  protected validateSearch(companyName: string): boolean {
    return Boolean(companyName && companyName.length > 0)
  }

  /**
   * Sleep helper for rate limiting
   */
  protected sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Get state code
   */
  getState(): string {
    return this.config.state
  }

  /**
   * Retry a function with exponential backoff
   * Returns the result along with retry count
   */
  protected async retryWithBackoff<T>(
    fn: () => Promise<T>,
    context: string
  ): Promise<{ result: T; retryCount: number }> {
    let lastError = new Error('Unknown error')
    
    for (let attempt = 0; attempt <= this.config.retryAttempts; attempt++) {
      try {
        this.log('info', `${context} - Attempt ${attempt + 1}/${this.config.retryAttempts + 1}`)
        const result = await fn()
        return { result, retryCount: attempt }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        
        if (attempt < this.config.retryAttempts) {
          // Check if error is retryable
          if (this.isRetryableError(lastError)) {
            // Exponential backoff: 2^attempt * 1000ms
            const backoffMs = Math.min(Math.pow(2, attempt) * 1000, 30000)
            this.log('warn', `${context} failed: ${lastError.message}. Retrying in ${backoffMs}ms...`)
            await this.sleep(backoffMs)
          } else {
            // Non-retryable error - fail immediately
            this.log('error', `${context} failed with non-retryable error: ${lastError.message}`)
            throw lastError
          }
        }
      }
    }
    
    this.log('error', `${context} failed after ${this.config.retryAttempts + 1} attempts`)
    throw lastError
  }

  /**
   * Check if an error is retryable
   */
  protected isRetryableError(error: Error): boolean {
    const message = error.message.toLowerCase()
    
    // Network errors that should be retried
    const retryablePatterns = [
      'timeout',
      'network',
      'econnreset',
      'enotfound',
      'etimedout',
      'econnrefused',
      'socket hang up',
      'navigation timeout',
      'net::err_',
      'failed to fetch'
    ]
    
    return retryablePatterns.some(pattern => message.includes(pattern))
  }

  /**
   * Structured logging
   */
  protected log(level: 'info' | 'warn' | 'error', message: string, data?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString()
    
    // Log to console with appropriate method
    const logMethod = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
    logMethod(`[${timestamp}] [${level.toUpperCase()}] [${this.config.state}] ${message}`, data || '')
  }

  /**
   * Validate scraped filing data
   */
  protected validateFiling(filing: Partial<UCCFiling>): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!filing.filingNumber || filing.filingNumber.trim() === '') {
      errors.push('Missing filing number')
    }
    
    if (!filing.debtorName || filing.debtorName.trim() === '') {
      errors.push('Missing debtor name')
    }
    
    if (!filing.securedParty || filing.securedParty.trim() === '') {
      errors.push('Missing secured party')
    }
    
    if (!filing.filingDate || filing.filingDate.trim() === '') {
      errors.push('Missing filing date')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Validate and filter an array of filings
   * Returns validated filings and collects all errors
   */
  protected validateFilings(
    rawFilings: Partial<UCCFiling>[],
    parseErrors: string[] = []
  ): { validatedFilings: UCCFiling[]; validationErrors: string[] } {
    const validatedFilings: UCCFiling[] = []
    const validationErrors: string[] = [...parseErrors]

    rawFilings.forEach((filing, index) => {
      const validation = this.validateFiling(filing)
      if (validation.valid) {
        validatedFilings.push(filing as UCCFiling)
      } else {
        validationErrors.push(`Filing ${index + 1} validation errors: ${validation.errors.join(', ')}`)
      }
    })

    return { validatedFilings, validationErrors }
  }
}
