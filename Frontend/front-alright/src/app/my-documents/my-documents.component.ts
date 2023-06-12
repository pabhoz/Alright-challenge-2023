import { Component } from '@angular/core';

@Component({
  selector: 'app-my-documents',
  templateUrl: 'my-documents.component.html',
})
export class MyDocumentsComponent {
  documentTitle: string = '';
  selectedFile!: File;
  documents: any[] = []; // Array para almacenar los documentos
  selectedDocument: any; // Documento seleccionado para vista previa

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadDocument() {
    // Lógica para enviar el documento al backend
  }

  previewDocument(document: any) {
    // Lógica para obtener la URL de vista previa del documento seleccionado
  }

  requestReview(document: any) {
    // Lógica para solicitar revisión del documento seleccionado
  }

  deleteDocument(document: any) {
    // Lógica para eliminar el documento seleccionado
  }
}
