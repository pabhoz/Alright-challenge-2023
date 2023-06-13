import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DocumentsService } from '../../../../../Backend/backend/src/documents/documents.service';

@Component({
  selector: 'app-my-documents',
  templateUrl: 'my-documents.component.html',
})
export class MyDocumentsComponent {
  documentTitle: string = '';
  selectedFile!: File;
  documents: any[] = []; // Array para almacenar los documentos
  selectedDocument: any; // Documento seleccionado para vista previa
  documentPreviewUrl: string = ''; // URL de vista previa del documento seleccionado
  selectedReviewer: number = 0;

  constructor(
    private http: HttpClient,
    private documentService: DocumentsService
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadDocument() {
    // Logica para manejar la carga de documentos al back
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('title', this.documentTitle);

    this.http.post<any>('http://localhost:3000/documents', formData).subscribe(
      (response) => {
        // Carga de documento exitosa, realizar acciones adicionales si es necesario
        console.log('Carga de documento exitosa:', response);
      },
      (error) => {
        // Error durante la carga de documento, manejar el error de acuerdo a tus necesidades
        console.error('Error durante la carga de documento:', error);
      }
    );
  }

  previewDocument(documentID: number) {
    // Logica para manejar la previsualización del documento
    if (this.selectedDocument !== 0) {
      const url = `http://localhost:3000/documents/preview/${this.selectedDocument}`;

      this.http.get<any>(url).subscribe(
        (response) => {
          // Obtener URL de vista previa exitosa
          this.documentPreviewUrl = response.previewUrl;
        },
        (error) => {
          // Error al obtener URL de vista previa, manejar el error de acuerdo a tus necesidades
          console.error('Error al obtener URL de vista previa:', error);
        }
      );
    }
  }

  requestReview(documentID: number) {
    // Logica para solicitar revision del documento
    if (this.selectedDocument !== 0 && this.selectedReviewer !== 0) {
      const requestData = {
        documentId: this.selectedDocument,
        reviewerId: this.selectedReviewer,
      };

      this.http
        .post<any>(
          'http://localhost:3000/documents/request-review',
          requestData
        )
        .subscribe(
          (response) => {
            // Solicitud de revisión exitosa, realizar acciones adicionales si es necesario
            console.log('Solicitud de revisión exitosa:', response);
          },
          (error) => {
            // Error al realizar la solicitud de revisión, manejar el error de acuerdo a tus necesidades
            console.error('Error al realizar la solicitud de revisión:', error);
          }
        );
    }
  }

  // requestReview() {
  //   if (!this.selectedDocument || !this.selectedDocument.id) {
  //     return;
  //   }

  //   const documentId = this.selectedDocument.id;
  //   const selectedReviewerId = this.reviewers[0].id; // Obtén el ID del revisor seleccionado aquí

  //   this.documentService.requestReview(documentId, selectedReviewerId).subscribe(
  //     (response: any) => {
  //       // Procesa la respuesta exitosa del backend
  //       console.log('Solicitud de revisión enviada');
  //       // Aquí puedes realizar alguna acción adicional, como actualizar la lista de documentos o mostrar un mensaje de éxito
  //     },
  //     (error: any) => {
  //       // Procesa el error de la solicitud
  //       console.error('Error al enviar la solicitud de revisión', error);
  //       // Aquí puedes mostrar un mensaje de error o realizar alguna otra acción
  //     }
  //   );
  // }

  // Lógica para eliminar el documento seleccionado
  deleteDocument(documentID: number) {
    if (this.selectedDocument !== 0) {
      const url = `http://localhost:3000/documents/${this.selectedDocument}`;

      this.http.delete<any>(url).subscribe(
        (response) => {
          // Eliminación de documento exitosa, realizar acciones adicionales si es necesario
          console.log('Eliminación de documento exitosa:', response);
        },
        (error) => {
          // Error al eliminar el documento, manejar el error de acuerdo a tus necesidades
          console.error('Error al eliminar el documento:', error);
        }
      );
    }
  }
}
