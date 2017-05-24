import { SavorlocalPage } from './app.po';

describe('savorlocal App', function() {
  let page: SavorlocalPage;

  beforeEach(() => {
    page = new SavorlocalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
