module.exports = class Utils {
  constructor(client) {
    if (!client) {
      throw TypeError("The Client Class Is Not Defined, Please Use It As So: \"this.utils = new Utils(this)\"")
    }
  }
  static formatEmoji(emoji) {
    return !emoji.id || emoji.available
    ? emoji.toString() // Checks if the emoji is a unicode character or string
    : `[${emoji.name}](${emoji.url})` // The bot is unable to use the emoji
  }
  sleep = (duration) => new Promise(Resolve => setTimeout(Resolve, duration * 1000))
  convertTime(duration) {

    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (duration < 3600000) {
      return minutes + ":" + seconds ;
    } else {
      return hours + ":" + minutes + ":" + seconds ;
    }
}
  convertNumber(number, decPlaces) {
    
      decPlaces = Math.pow(10,decPlaces);

      var abbrev = [ "K", "M", "B", "T" ];

    
    for (var i=abbrev.length-1; i>=0; i--) {

          var size = Math.pow(10,(i+1)*3);
        
          if(size <= number) {
              
              number = Math.round(number*decPlaces/size)/decPlaces;

            
              if((number == 1000) && (i < abbrev.length - 1)) {
                  number = 1;
                  i++;
              }

              number += abbrev[i];

              break;
          }
      }

      return number;
  }
  convertHmsToMs(hms) {
      if (hms.length < 3) {
          return hms = ((+a[0]) * 1000)
      } else if (hms.length < 6) {
          const a = hms.split(':')
          return hms = (((+a[0]) * 60 + (+a[1])) * 1000)
      } else {
          const a = hms.split(':')
          return hms = (((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])) * 1000)
      }
  }
  convertBytesToHumanReadableSize(bytes) {
    var Size_Abbrev = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    if(bytes == 0) {
      return "N/A"
    }
    var ByteSize = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)))
    if(ByteSize == 0) {
      return bytes + " " + Size_Abbrev[ByteSize]
    }
    return (bytes / Math.pow(1024, ByteSize)).toFixed(2) + ' ' + Size_Abbrev[ByteSize]
  }
}
