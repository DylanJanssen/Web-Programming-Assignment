import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(private http: HttpClient) { }

  imgUpload(fd) {
    return this.http.post('/upload', fd)
  }
}
