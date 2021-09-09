<h1 align="center">Diasfero</h1>



- The working website can be found [here.](https://fsmp.herokuapp.com/)
- GitHub [here.](https://github.com/Aleksandre19/fsmp.git)


Diasfero is video portal in a healthcare area. A person can register on this site and make subscription in order to have access to the videos. This site has a mobile first approach markup. The site is divieded by sections for users easy use and navigation purpose. Once user is logged in: he or she can access to the videos by categories and sub categories, add a video in the "My List" and like a video. The user has a profile page where he or she can manage own accounts.

To enhance a user experience the site uses a javascript video slider which has a swipeable functionality on the tablet and lower devices. On the desktop and large devices the video slider maintains a swipeable functionality and additionally shows a arrows for a mouse navigation.

<h2 align="center"><img src="https://i.ibb.co/t8v4g5G/all-devices-black.png"></h2>
  

## User Experience (UX)

-   ### User stories

    - #### First time visitor
        1. As a first time visitor I want to easily and quikly understand what is the site about.
        2. As a first time visitor I want to know quikly if it is privite or company.
        3. As a first time visitor I  want to have ability to watch demo videos.
        4. As a firts time visitor I want to know how to access content.
        5. As a first time visitor I want to have FAQ

    - #### Returning visitor 
        1. As a returned visitor I want to have ability to contact to the site owner in case any additional questions.
        2. As a returned visitor I want have ability to make a subscription.
        3. As a returned visitor I want to have ability to choose a subscription's plans.

    - #### User of the site
        1. As a site user I want to have my profile page from where I can manage my account and quikly access to my videos.
        2. As a site user I want that videos be sorted by categories and subcategories.
        3. As a site user I want to have search field.
        4. As a site user I want to be able to truck upcomming events and incase of wish be able to save it.
        5. As a site user I want to make likes on the videos and have ability to save in "My List".
        6. As a site user I want that the site be mobile friendly. 



-   ### Strategy
    - Create a web-page's sketch
    - Create a design in Photoshop
    - Use a bootstrap to make a mobile friendly.
    - Create a site which will be written in a Django/Python.
    - Use a Django's all-auth functionality to create a user stories
    - Use a Javascript to create a swipeable video slider
    - Use a heroku for a deploiment and a GitHub for a repository  

- ### Structure
    - **The site has a main top manu which displays the maijor links.**
        - If is user is not registered a subscription link is shown
        - If a user is registered and has no subscription than the subscription link remains in the top menu
        - If a user is registered and has subscription so the subscription link disappears and the videos link appears
    - **On the right side of the site is a user icon.**
        - If a user is not authenticated/registered and clicks on that icon so he/she goes the authentication/registration page.
        - If a user is authenticated and has subscription so by clicking on that icon a profile links appears.
        - If a user is authenticated and has no subscription so the profile links disappears and appears a subscription and a logout links.
    - **The site has a video sliders by categories** 
        - On the mobiles and tablets video slider is only swipeabel.
        - On the desjtop devices swipable functionality remains and additionally appears a arrows on the both sids of the galleries.
    - **For accessing to the all videos the site has separate link in the top menu named by Videos**
        - On the desktop devices categories and sub categories are listed left side of the site.
            - When a user clicks one of the specific category's link in stead of disppearing other links from the side menu they remain unchanged and a user has ability to choose other link without navigating back.
        - On the mobile and tablet devices the side menu is hidden automatically  and it appears only when a user clicks on the select tag icon and covers around 25% of the page.
            - If a user's finger touches to the page and scrolls the side manu remains still.
            - If user's finger touches to the side manu and scrolls the page remains still.
        - To close the side menu a user clicks on the X icon
    - **In the footer section there are quick access links.** 
- ### Skeleton

    - I draw the site structure on a [balsmiq](https://balsamiq.cloud/) for all the type of divecies (Mobiles, Tablets, Desktops)
    - ##### Wireframes
    Desktops | Tablets | Mobiles
    -------- | -------- | -------
    [Home page not logged in](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/home-not-logged-in.pdf) | [Home page not logged in](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-home-not-logged-in.pdf) | [Home page not logged in](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-home-not-logged.pdf)
    [Home page logged in](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/home-logged-in.pdf) | [Home page logged in](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-home-logged-in.pdf) | [Home page logged in](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-home-logged-in.pdf)
    [Videos page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/videos.pdf) | [Videos page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-videos-page.pdf) | [Videos page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-videos.pdf)
    [Subscription page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/subscription.pdf) | [Subscription page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-subscription.pdf) | [Subscription page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-subscription.pdf)
    [Single video page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/single-video.pdf) | [Single video page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-single-video.pdf) | [Single video page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-single-video.pdf)
    [Category page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/single-category.pdf) | [Category page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-category.pdf) | [Category page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-categories.pdf)
    [Registration page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/registration.pdf) | [Registration page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-registration.pdf) | [Registration page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-registration.pdf)
    [User profile page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/profile.pdf) | [User profile page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-profile.pdf) | [User profile page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-profile.pdf)
    [Playlists page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/playlists.pdf) | [Playlists page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-playlists.pdf) | [Playlists page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-playlists.pdf)
    [Events page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/events.pdf) | [Events page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-profile-event.pdf) | [Events page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-profile-events.pdf)
    [Contact page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/contact.pdf) | [Contact page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-contact.pdf) | [Contact page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-contact.pdf)
    [Account page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/account.pdf) | [Account page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-account.pdf) | [Account page](https://github.com/Aleksandre19/fsmpfiles/blob/f3d81024785ccd8e829bafd2d23fa0f9d76180f7/mobile/mobile-sccount.pdf)
    [FAQ page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/FAQ.pdf) | [FAQ page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-faq.pdf) | [FAQ page](https://github.com/Aleksandre19/fsmpfiles/blob/f3d81024785ccd8e829bafd2d23fa0f9d76180f7/mobile/mobile-faq.pdf)
    [Authentication page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Desktop/Authentication.pdf) | [Authentication page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/Tablets/tablet-authentication.pdf) | [Authentication page](https://github.com/Aleksandre19/fsmpfiles/blob/f3d81024785ccd8e829bafd2d23fa0f9d76180f7/mobile/mobile-authentication.pdf)
- ### Design
    - I draw the designe of the site in the photoshop.
    - ##### Design PNG files
    Desktops | Mobiles
    -------- | --------
    [Home page not logged in](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/home-not-logged-in.png) | [Home page not logged in](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/home-not-logged-in.png)
    [Home page logged in](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/home-not-logged-in.png) | [Home page logged in](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/home-logged-in.png)
    [Videos page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/videos.png) | [Videos page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/videos.png)
    [Subscription page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/subscription.png) | [Subscription page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/subscription.png)
    [Single video page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/single_video.png) | [Single video page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/single-video.png)
    [Category page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/category.png) | [Category page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/category.png)
    [Registration page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/registration.png) | [Registration page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/registration.png)
    [User profile page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/profile.png) | [User profile page](https://github.com/Aleksandre19/fsmpfiles/blob/0465d659bd405065d9b955fd9ccb5c8660f5394e/mobile/mobile-profile.pdf)
    [Playlists page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/playlist.png) | [Playlists page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/profile.png)
    --- | [Events page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/profile-events.png)
    [Contact page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/contact.png) | [Contact page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/contact.png)
    [Account page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/account.png) | [Account page](https://github.com/Aleksandre19/fsmpfiles/blob/3fe6ca7ec642b14eb791bb0206b5ff19cd8fe3e9/design/mobile/account.png)
    [FAQ page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/faq.png) | [FAQ page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/faq.png)
    [Authentication page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/desktop/authentication.png) | [Authentication page](https://github.com/Aleksandre19/fsmpfiles/blob/92c67c17e2cdfe0d9ad4d5541f649fb11b0f29b0/design/mobile/authentication.png)
    
    

