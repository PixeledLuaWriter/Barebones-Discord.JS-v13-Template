import chalk from "chalk";
import moment from "moment";

module.exports = class Logger {
  static log (type = "eventLoaded", content) {
    const getCurrentDate = `${moment().format('DD-MM-YY | hh:mm:ss')}`
    switch (type) {
      case "eventLoaded": {
        return console.log(`[${chalk.gray(date)}][${chalk.black.bgBlue(type.toUpperCase())}]: ${content}`)
      }
      case "errorEmitted": {
        return console.log(`[${chalk.gray(date)}][${chalk.black.bgRedBright(type.toUpperCase())}]: ${content}`)
      }
      case "apiResponse": {
        return console.log(`[${chalk.gray(date)}][${chalk.black.bgGreen(type.toUpperCase())}]: ${content}`)
      }
      case "internalOperations": {
        return console.log(`[${chalk.gray(date)}][${chalk.black.bgYellowBright(type.toUpperCase())}]: ${content}`)
      }
      default: throw new TypeError("The Logger Type Property Must Be One Of The Following: eventLoaded, errorEmitted, apiResponse, or internalOperations");
    }
  }
}
