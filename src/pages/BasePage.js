class BasePage {

    constructor(page) {
        this.page = page;
    }

    async getPageHeader() {
        // The header is either an h2 or h3 element.
        const h2Selector = 'document.querySelector("div.example h2");';
        const h3Selector = 'document.querySelector("div.example h3");';
        let returnText;
        try {
            returnText = await page.evaluate(h2Selector).textContent;
        } catch (err) {
            // assume h2 is not the page header
            returnText = await page.evaluate(h3Selector).textContent;
        }
        return returnText;
    }

}

module.exports = BasePage;
