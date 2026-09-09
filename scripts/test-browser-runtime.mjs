#!/usr/bin/env node
// Offline runtime smoke for reviewed browser-engine upgrades. Supply an already
// installed browser; this script downloads nothing and visits only a data URL.
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import puppeteer from 'puppeteer'
import puppeteerExtra from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { chromium } from 'playwright'
import { resolveBrowserExecutablePath } from '../server/utils/browser-executable.ts'

const executablePath = resolveBrowserExecutablePath()
assert.ok(executablePath, 'Configure a Chromium executable for the offline runtime smoke')
const require = createRequire(import.meta.url)
// Production server bundles are CommonJS; verify Node can load the ESM package
// using the same runtime boundary before starting a browser.
assert.equal(typeof require('puppeteer').launch, 'function')
assert.deepEqual(await puppeteerExtra.defaultArgs(), await puppeteer.defaultArgs())
puppeteerExtra.use(StealthPlugin())
const results = []
for (const [name, launcher] of [
  ['puppeteer', puppeteer],
  ['puppeteer-extra-stealth', puppeteerExtra]
]) {
  const browser = await launcher.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  })
  try {
    const page = await browser.newPage()
    await page.goto('data:text/html,<title>UCC runtime probe</title><p id="result">local-only</p>')
    assert.equal(await page.title(), 'UCC runtime probe')
    assert.equal(await page.$eval('#result', (element) => element.textContent), 'local-only')
    await page.close()
    results.push({ launcher: name, browser: await browser.version(), result: 'passed' })
  } finally {
    await browser.close()
    assert.equal(browser.connected, false, `${name} did not disconnect after close`)
  }
}
const playwrightBrowser = await chromium.launch({ executablePath, headless: true })
try {
  const page = await playwrightBrowser.newPage()
  await page.goto('data:text/html,<title>UCC runtime probe</title><p id="result">local-only</p>')
  assert.equal(await page.title(), 'UCC runtime probe')
  assert.equal(await page.$eval('#result', (element) => element.textContent), 'local-only')
  await page.close()
  results.push({ launcher: 'playwright', browser: playwrightBrowser.version(), result: 'passed' })
} finally {
  await playwrightBrowser.close()
  assert.equal(playwrightBrowser.isConnected(), false, 'Playwright did not disconnect after close')
}
console.log(JSON.stringify({ node: process.version, results }, null, 2))
