import { Dimensions, PixelRatio } from "react-native";

const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const adjustment = (size) => {
  if (pixelRatio >= 2 && pixelRatio <= 3) {
    // iPhone 5 and older androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }

    // iPhone 5
    if (deviceHeight < 667) {
      return size;
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }

    // Older phablets
    return size * 1.25;
  }

  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // Android font scaling on small machines
    if (deviceWidth <= 360) {
      return size;
    }

    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
    }

    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }

    // iphone 6s or plus7 plus
    return size * 1.27;
  }

  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    if (deviceWidth <= 360) {
      return size;
    }

    // Catch other smaller android height sizings
    if (deviceHeight < 667) {
      return size * 1.2;
    }

    // catch in-between size Androids and scale font up
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }

    // catch larger phablet devices
    return size * 1.4;
  }

  return size;
};

export default adjustment;
