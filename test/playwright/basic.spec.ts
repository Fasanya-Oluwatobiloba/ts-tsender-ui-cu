import basicSetup from "../wallet-setup/basic.setup"
import { testWithSynpress } from "@synthetixio/synpress"
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright"

const test = testWithSynpress(metaMaskFixtures(basicSetup))
const { expect } = test

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle("TSender");
});

test("should show the airdropForm when connected, otherwise not", async ({ page, context, metamaskPage, extensionId }) => {
  await page.goto('/');
  await  expect(page.getByText("Please connect a wallet ....")).toBeVisible();

  // // Check if we see the airdrop form
  // await expect(page.getByRole("form")).not.toBeVisible();

  const metamask = new MetaMask(context as any, metamaskPage as any, basicSetup.walletPassword, extensionId as any)
  await page.getByTestId("rk-connect-button").click()
  await page.getByTestId("rk-wallet-option-MetaMask").waitFor({
    state: "visible",
    timeout: 30000
  })
  await page.getByTestId("rk-wallet-option-MetaMask").click()
  await metamask.connectToDapp()

  const customNetwork = {
    name: "Anvil",
    rpcUrl: "http://127.0.0.1:8545",
    chainId: 31337,
    symbol: "ETH"
  }

  await metamask.addNetwork(customNetwork)

  await expect(page.getByText("Token Address")).toBeVisible();
})
