import { Component, OnInit } from '@angular/core';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UploadService]
})
export class AppComponent {
  title = 'app';
  fileToUpload1: File = null;
  fileToUpload2: File = null;

  urlPhoto1: string;
  urlPhoto2: string;
  urlsemiFinal: string;

  urlFinal: string;
  firstPhoto: string;
  secondPhoto: string;

  constructor(
    private upload: UploadService,
  ) { }
  handleFileInput(files: FileList) {

    console.log(files)
    this.fileToUpload1 = files.item(0);
    if (files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.firstPhoto = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    }

    if (files) {
      this.fileToUpload2 = files.item(1);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.secondPhoto = e.target.result;
      };
      reader.readAsDataURL(files[1]);
    }
  }
  uploadFileToActivity() {
    // this.upload.postFile(this.fileToUpload).subscribe(data => {
    //   console.log(data);
    //   this.urlPhoto = data;
    //   this.upload.ChangeFile(this.urlPhoto).subscribe(r => { this.urlFinal = r, console.log(r) }, e => console.log(e))
    // }, error => {
    //   this.urlPhoto = error.error.text;
    //   console.log(error.error.text);
    //   this.upload.ChangeFile(this.urlPhoto).subscribe(r => { this.urlFinal = r, console.log(r) }, e => this.urlFinal = e.error.text)
    // });

    this.upload.postFile(this.fileToUpload1).subscribe(data => { },
      error => {
        this.urlPhoto1 = error.error.text;

        this.upload.postFile(this.fileToUpload2).subscribe(data => { },
          error => {
            this.urlPhoto2 = error.error.text;
            this.upload.ChangeFile(this.urlPhoto1, "1476").subscribe(r => { this.urlFinal = r, console.log(r) }, e => { 
              this.urlsemiFinal = e.error.text;
              this.upload.ChangeFile2(this.urlsemiFinal, this.urlPhoto2, "1978").subscribe(r => { this.urlFinal = r, console.log(r) }, e => { 
                this.urlFinal = e.error.text;
                
              })
            })

          });
      });



  }

  openWin2() {
    open("http://www.facebook.com/sharer.php?u="+this.urlFinal,"displayWindow","width=520,height=300,left=350,top=170,status=no,toolbar=no,menubar=no");
    }
}
