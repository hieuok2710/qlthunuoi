import { IconType } from 'react-icons';

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: IconType;
}

export interface User {
  id: number;
  username: string;
  passwordHash: string; // This should be properly hashed in a real-world application
  role: 'admin' | 'user' | 'quanly';
}

export interface Appointment {
  id: number;
  userId: number;
  ownerName: string;
  petName: string;
  petType: 'Chó' | 'Mèo' | 'Khác';
  appointmentDate: string;
  serviceId: number;
  serviceName: string;
  status: 'Đã xác nhận' | 'Hoàn thành' | 'Đã hủy';
}

export interface TeamMember {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  petInfo: string;
  rating: number;
}

export interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    isRead: boolean;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: 'Đồ chơi' | 'Trang sức' | 'Dụng cụ chăm sóc';
    stock: number;
}

// Fix: Add the missing 'News' interface to resolve type errors in News-related components.
export interface News {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    date: string;
}

export interface Sale {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    pricePerItem: number;
    totalPrice: number;
    saleDate: string; // ISO string
}

export interface InventoryLog {
    id: number;
    productId: number;
    productName: string;
    type: 'Nhập kho' | 'Xuất kho' | 'Bán hàng';
    quantityChange: number; // always positive
    stockAfter: number;
    date: string; // ISO string
}