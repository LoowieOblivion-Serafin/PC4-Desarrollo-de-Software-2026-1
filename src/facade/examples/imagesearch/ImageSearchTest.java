package facade.examples.imagesearch;

import adapter.examples.metadata.RawImage;
import strategy.examples.searchintent.SearchIntent;

public class ImageSearchTest {
    public static void main(String[] args) {
        ImageSearchFacade facade = new ImageSearchFacade();
        RawImage img = new RawImage(new byte[]{1, 2, 3, 4}, "JPEG");

        System.out.println(facade.uploadAndSearch(img, SearchIntent.ADOPTION));
        System.out.println(facade.uploadAndSearch(img, SearchIntent.SALE));
        System.out.println(facade.uploadAndSearch(img, SearchIntent.VERIFY_LOSS));
    }
}
