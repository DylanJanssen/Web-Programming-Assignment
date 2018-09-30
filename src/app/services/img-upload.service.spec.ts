import { TestBed, inject } from '@angular/core/testing';

import { ImgUploadService } from './img-upload.service';

describe('ImgUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgUploadService]
    });
  });

  it('should be created', inject([ImgUploadService], (service: ImgUploadService) => {
    expect(service).toBeTruthy();
  }));
});
