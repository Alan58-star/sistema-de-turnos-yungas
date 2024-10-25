import { Component, OnInit } from '@angular/core';
import { MedicosListComponent } from "./medicos-list/medicos-list.component";
import { AdminNavComponent } from "./admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';
import { io } from 'socket.io-client'
import { NgIf } from '@angular/common';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [MedicosListComponent, AdminNavComponent, RouterLink, NgIf],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {

  qrCodeUrl: string | null = null;
  loading: boolean = true;
  private socket: any;

  ngOnInit(): void {
    this.initializeSocket();
  }

  private initializeSocket() {
    this.socket = io('http://localhost:4000');

    // Escuchar el evento 'qr' para recibir el código QR
    this.socket.on('qr', (data: string) => {
      this.qrCodeUrl = data;
      this.loading = false;
    });

    // Escuchar el evento 'qr-read' para ocultar el div del QR
    this.socket.on('qr-read', () => {
      this.qrCodeUrl = null;
      this.loading = false;
    });

    // Escuchar el evento 'ready' al conectar para verificar si ya está listo
    this.socket.on('ready', () => {
      this.loading = false; // Ocultar el mensaje de carga si ya está listo
      this.qrCodeUrl = null; // Asegurarse de que no se muestre el QR
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

}
