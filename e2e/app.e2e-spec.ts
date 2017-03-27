import { SeplagGridViewPage } from './app.po';

describe('seplag-grid-view App', () => {
  let page: SeplagGridViewPage;

  beforeEach(() => {
    page = new SeplagGridViewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
