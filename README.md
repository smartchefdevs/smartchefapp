# SmartChef nombre [CAMBIAR]

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

  - [Node](https://nodejs.org/es/download/)
  - [React Native](https://facebook.github.io/react-native/docs/getting-started)
  - react-native-cli
  - Android studio / Xcode


### Installing
Clone this repo

1. Install node_modules
```bash
 $ npm install or yarn install
```
Omit, if you have installed `react-native-cli` otherwise
```bash
 npm install -g react-native-cli
```

2. Connect device or run emulator.

> Android

```bash
react-native run-android
```
> Ios
```bash
react-native run-ios
```


## Running the tests

TODO


### And coding style tests

Add airbnb linter TODO

## Deployment

TODO

## Built With

* [React Native](https://facebook.github.io/react-native/docs/getting-started) - Build native mobile apps using JavaScript and React

## Generating Signed APK
Change in the file `app/build.gradle`
```gradle
def enableProguardInReleaseBuilds = true
```
> Android
```bash
$ cd android
$ ./gradlew assembleRelease
```
On finished run
```bash
$ react-native run-android --variant=release
```
Locate apk in `android/app/build/outputs/apk/release/app-release.apk`

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Juan camilo caviedes** - *Initial work* - [git](https://github.com/jcaviedes97)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## knowledge

* javacript
* react native
* redux
* redux-sagas
* java 1.8+
* Android Studio / Xcode Studo
