'use strict';

(function() {
  describe('Convert service', function() {
    describe('convertService', function() {
      beforeEach(function() {
        module('mean');
        module('mean.system');
      });

      var convertService;
      var stringUtf8 = 'ngô hoài phương';
      var stringUtf8Standrad = 'ngo hoai phuong';

      beforeEach(inject(function($injector) {
        convertService = $injector.get('convertService');
      }));

      it('should return value', function() {
        expect(convertService.toUtf8Standard(stringUtf8)).toEqual(stringUtf8Standrad);
      });
    });
  });
})();
