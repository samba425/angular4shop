import { Angular4shopPage } from './app.po';

describe('angular4shop App', () => {
  let page: Angular4shopPage;

  beforeEach(() => {
    page = new Angular4shopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
