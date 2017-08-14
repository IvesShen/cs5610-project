# CS5610 Web Development Project
# Yanchao Shen

    My Email        : shen.yanc@husky.neu.edu
    My Github repo  : https://github.com/IvesShen/cs5610-project
    My Heroku       : https://cs5610-webdev-yanchao.herokuapp.com

    1. explain how to use your app, give a simple navigation

    This app "Find Your Dog" is for those people who lost their dogs or those who found a missing dog by the way.
    Owner or finder can post the dog's information including dog's name (required for owner), dog's breeds (required for owner)
    Owner/finder's name, owner/finder's contact information (required), dog's description, and thanks to google map, you can use
    Google Map marker to mark the location where you lost or found a dog.

    1.1 home page
        Home page includes my name and email address, it also includes the link to home page (if logged in)
        or login page (if not logged in)

    1.2 login page
        You can use local login credentials or Google Auth credentials to login the app, or if you do not
        have a account you can click the register link to register page.

    1.3 register page
        User can register their account here, remember username is required and password and verify password should be exactly
        the same.

    1.4 main page
        On the right side of navigation bar, your account username will be shown there, click your username will navigate to
        profile page and if you are a admin user, you will see a dashboard icon, click it will navigate to admin page.
        There are two links in the pictures, one is "Find All lost Dogs", which will navigate to All Lost Dogs page, and
        the other is "Find All Found Dogs", which will navigate to All Found Dogs page. There are also four (4) services below, I lost
        my dog page, My lost dogs page, I found a dog page and My found dogs page.

    1.5 profile page
        You can update your personal information, or unregister current account, or logout here.

    1.6 I lost my dog page
        You can post your lost dog's information here, you just need to click the map to post a marker, and the latitude and
        longitude information will be shown automatically.
        (Tip: sometimes the map doesn't show up because of the google map loading issue, just refresh the page and it will work :)

    1.7 my lost dogs page
        My lost dog page will list all of your lost dogs, and you can edit the information by click the gear icon on the right side.

    1.8 my lost dogs edit page
        In my lost dogs edit page, you can update your lost dog's information or delete the post if your dog has been found.

    1.9 I found a dog page
        Refer to I lost my dog page.

    1.10 my found dogs page
        Refer to my lost dogs page.

    1.11 my found dogs edit page
        Refer to my lost dogs edit page.

    1.12 all lost dogs page
        Here lists all of the lost dogs that haven't been found yet.

    1.13 all found dogs page
        Here lists all of the found dogs that haven't met their owner yet.

    1.14 admin page
        Here lists three (3) links to admin users, admin lost dogs, admin found dogs

    1.15 admin users
        Here lists all users and their information, you can also delete users or change other users' permission here.

    1.16 admin lost dogs
        Refer to admin users.

    1.17 admin found dogs
        Refer to admin users.

    2. provide login credentials (username and password)

    Admin user:
    Username: admin
    Password: admin

    Normal user:
    Username: alice
    Password: alice
