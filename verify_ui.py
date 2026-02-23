from playwright.sync_api import sync_playwright
import time

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Set up mock before navigation
            page.add_init_script("window.forceDemoWallet = true;")
            page.goto("http://localhost:5173")

            # Wait for page to load
            page.wait_for_selector(".App", timeout=10000)

            # Verify Sidebar
            print("Verifying Sidebar...")
            page.wait_for_selector(".sidebar")

            # Verify Initial State (Elite Unlocked due to mock)
            print("Verifying Elite Unlocked...")
            page.wait_for_selector(".institutional-insights-unlocked")

            # Click Simulation Toggle
            print("Toggling Simulation Mode...")
            page.click(".slider")
            page.wait_for_selector(".switch input:checked", state="attached")

            # Verify RiskDetail changes
            print("Verifying RiskDetail Simulation Mode...")
            page.wait_for_selector(".risk-detail-card.simulation-active")

            # Click Notarize Button
            print("Clicking Notarize Button...")
            page.click("button:has-text('Notarize Integrity Score')")

            # Wait for toast
            print("Waiting for Toast...")
            page.wait_for_selector("div:has-text('Integrity Score committed')")
            print("Toast detected in DOM.")

            # Screenshot
            print("Taking Screenshot...")
            page.screenshot(path="verification_screenshot.png", full_page=True)

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification_error.png")
            raise e
        finally:
            browser.close()
            print("Verification complete.")

if __name__ == "__main__":
    verify_ui()
