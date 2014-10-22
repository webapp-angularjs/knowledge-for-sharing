'use strict';

// exports.utf8Library = function(){
//   return {
//     /**
//      * Convert string utf8 have sign to string utf8 no sign
//      * @param  {[type]} stringUtf8 [string need convert]
//      * @return {[type]}            [string after convert]
//      */
//     toUtf8Standard: function(stringUtf8) {
//       var patterns = {
//         'a': 'á|à|ả|ã|ạ|â|ă|ấ|ầ|ẩ|ẫ|ậ|ắ|ằ|ẳ|ẵ|ặ',
//         'd': 'đ',
//         'e': 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
//         'i': 'í|ì|ỉ|ĩ|ị',
//         'o': 'ó|ò|ỏ|õ|ọ|ô|ơ|ố|ồ|ổ|ỗ|ộ|ớ|ờ|ở|ỡ|ợ',
//         'y': 'ý|ỳ|ỷ|ỹ|ỵ',
//         'u': 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự'
//       };        
//       var stringUtf8Standrad = stringUtf8;

//       for(var key in patterns) {
//         stringUtf8Standrad = stringUtf8Standrad.replace(new RegExp(patterns[key], 'gi'), key);
//       }

//       return stringUtf8Standrad.toLowerCase();
//     }
//   };
// };

String.prototype.toUtf8Standard = function() {
  var patterns = {
    'a': 'á|à|ả|ã|ạ|â|ă|ấ|ầ|ẩ|ẫ|ậ|ắ|ằ|ẳ|ẵ|ặ',
    'd': 'đ',
    'e': 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
    'i': 'í|ì|ỉ|ĩ|ị',
    'o': 'ó|ò|ỏ|õ|ọ|ô|ơ|ố|ồ|ổ|ỗ|ộ|ớ|ờ|ở|ỡ|ợ',
    'y': 'ý|ỳ|ỷ|ỹ|ỵ',
    'u': 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự'
  };     

  var stringUtf8Standrad = this;

  for(var key in patterns) {
    stringUtf8Standrad = stringUtf8Standrad.replace(new RegExp(patterns[key], 'gi'), key);
  }

  return stringUtf8Standrad.toLowerCase();
};