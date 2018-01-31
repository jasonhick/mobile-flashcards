# React Nanodegree by Udacity

## Project 3: Flashcards

Flashcards is the third and final project in the [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019)
It emulates a basic quiz/flash card system where users can create decks and add questions(cards) to them.

This app has been tested on iOS & Android: iPhone6, iPhone7 & Samsung Galaxy S8 (7.0.0)

The site uses React Native with Redux and follows the [project rubric](https://review.udacity.com/#!/rubrics/1021/view).

### Installation

NB: You will need to use either Expo and a mobile device or have either an Android or iOS simulator installed locally.

* Clone this repository onto your computer
* cd into the 'mobile-flashcards' directory
* Run `yarn install` from the root directory of the app
* Run `yarn start` to start both servers
* Follow the onscreen instructions to launch either the iOS or Andriod simulators

### Notifications

Daily notifications have been set to trigger at 12:30pm.
To test local notifications more sooner than tomorrow(!) uncomment
line 44 in notifications.js:
// tomorrow.setDate(tomorrow.getTime() + 60000);

Notifications will be set for 60 seconds in the future every time you complete a quiz.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
