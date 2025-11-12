import { FaStethoscope, FaCut, FaShower, FaUserMd, FaSyringe } from 'react-icons/fa';
import { Service, User, Appointment, TeamMember, Testimonial, Message, Product } from './types';

// Fix: Provide initial data for services.
export const SERVICES: Service[] = [
  { id: 1, name: 'Khám tổng quát', description: 'Kiểm tra sức khỏe toàn diện cho thú cưng của bạn.', price: 150000, icon: FaStethoscope },
  { id: 2, name: 'Cắt tỉa lông', description: 'Gói cắt tỉa và tạo kiểu lông chuyên nghiệp.', price: 250000, icon: FaCut },
  { id: 3, name: 'Tắm & Vệ sinh', description: 'Dịch vụ tắm sạch sẽ, thơm tho và vệ sinh tai, móng.', price: 200000, icon: FaShower },
  { id: 4, name: 'Tư vấn dinh dưỡng', description: 'Xây dựng chế độ ăn uống lành mạnh và phù hợp.', price: 100000, icon: FaUserMd },
  { id: 5, name: 'Tiêm phòng', description: 'Các loại vắc-xin cần thiết để bảo vệ sức khỏe.', price: 300000, icon: FaSyringe },
  { id: 6, name: 'Phẫu thuật', description: 'Thực hiện các ca phẫu thuật từ đơn giản đến phức tạp.', price: 1000000, icon: FaUserMd },
];

// Fix: Provide initial data for users.
export const USERS: User[] = [
  { id: 1, username: 'admin', passwordHash: 'admin@##', role: 'admin' },
  { id: 2, username: 'user', passwordHash: 'user123', role: 'user' },
  { id: 3, username: 'quanly1', passwordHash: '123456', role: 'quanly' },
];

// Fix: Provide initial data for appointments.
export const APPOINTMENTS: Appointment[] = [
  { id: 1, userId: 2, ownerName: 'user', petName: 'Milo', petType: 'Chó', appointmentDate: '2024-08-10', serviceId: 1, serviceName: 'Khám tổng quát', status: 'Đã xác nhận' },
  { id: 2, userId: 2, ownerName: 'user', petName: 'Luna', petType: 'Mèo', appointmentDate: '2024-08-12', serviceId: 3, serviceName: 'Tắm & Vệ sinh', status: 'Hoàn thành' },
];

export const TEAM_MEMBERS: TeamMember[] = [
    { id: 1, name: 'Bác sĩ An', specialty: 'Chuyên gia Nội khoa', bio: 'Với hơn 10 năm kinh nghiệm, bác sĩ An luôn tận tâm chẩn đoán và điều trị các bệnh nội khoa phức tạp.', imageUrl: 'https://images.unsplash.com/photo-1612276529726-2c334d401a4a?q=80&w=1887&auto=format&fit=crop' },
    { id: 2, name: 'Bác sĩ Bình', specialty: 'Bác sĩ Phẫu thuật', bio: 'Bác sĩ Bình có tay nghề cao trong các ca phẫu thuật, luôn đảm bảo an toàn và phục hồi nhanh cho thú cưng.', imageUrl: 'https://images.unsplash.com/photo-1629425733663-5d548b261274?q=80&w=1887&auto=format&fit=crop' },
    { id: 3, name: 'Bác sĩ Chi', specialty: 'Chăm sóc Răng miệng', bio: 'Bác sĩ Chi chuyên về sức khỏe răng miệng, giúp thú cưng của bạn có nụ cười khỏe mạnh và hơi thở thơm tho.', imageUrl: 'https://images.unsplash.com/photo-1605108040733-469b7feb7330?q=80&w=1887&auto=format&fit=crop' },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: 'Các bác sĩ ở đây rất tuyệt vời! Họ chăm sóc chú chó của tôi rất chu đáo và tận tình. Tôi hoàn toàn tin tưởng PetCare Clinic.', author: 'Anh Hoàng', petInfo: 'Chủ của "Vàng"', rating: 5 },
    { id: 2, quote: 'Dịch vụ tắm và cắt tỉa lông rất chuyên nghiệp. Bé Miu nhà tôi trông xinh hẳn ra. Chắc chắn sẽ quay lại!', author: 'Chị Lan', petInfo: 'Chủ của "Miu"', rating: 5 },
    { id: 3, quote: 'Phòng khám sạch sẽ, hiện đại. Nhân viên thân thiện và luôn sẵn lòng giải đáp mọi thắc mắc. Rất hài lòng.', author: 'Anh Dũng', petInfo: 'Chủ của "Milu"', rating: 5 },
];

export const MESSAGES: Message[] = [];

export const PRODUCTS: Product[] = [
    { id: 1, name: 'Bóng cao su siêu bền', description: 'Đồ chơi bóng cao su tự nhiên, an toàn cho chó cưng nhai gặm.', price: 80000, imageUrl: 'https://images.unsplash.com/photo-1574536959981-255d315690b2?q=80&w=800', category: 'Đồ chơi', stock: 50 },
    { id: 2, name: 'Vòng cổ da thật', description: 'Vòng cổ bằng da cao cấp, có thể khắc tên theo yêu cầu.', price: 250000, imageUrl: 'https://images.unsplash.com/photo-1605716186430-85f099c9c1b7?q=80&w=800', category: 'Trang sức', stock: 30 },
    { id: 3, name: 'Lược chải lông 2 mặt', description: 'Lược chuyên dụng giúp gỡ rối và loại bỏ lông rụng hiệu quả.', price: 120000, imageUrl: 'https://images.unsplash.com/photo-1620782393796-65c7a421278b?q=80&w=800', category: 'Dụng cụ chăm sóc', stock: 45 },
    { id: 4, name: 'Cần câu mèo lông vũ', description: 'Đồ chơi tương tác giúp mèo vận động và giải tỏa căng thẳng.', price: 95000, imageUrl: 'https://images.unsplash.com/photo-1608821935398-3199afb2c3a5?q=80&w=800', category: 'Đồ chơi', stock: 60 },
    { id: 5, name: 'Kìm cắt móng', description: 'Kìm cắt móng chuyên nghiệp có khóa an toàn, dễ sử dụng.', price: 150000, imageUrl: 'https://images.unsplash.com/photo-1604743431958-755716383a1f?q=80&w=800', category: 'Dụng cụ chăm sóc', stock: 25 },
    { id: 6, name: 'Nơ đeo cổ xinh xắn', description: 'Phụ kiện nơ bướm nhiều màu sắc cho thú cưng trong các dịp đặc biệt.', price: 60000, imageUrl: 'https://images.unsplash.com/photo-1599339396353-3323a635b716?q=80&w=800', category: 'Trang sức', stock: 100 },
    { id: 7, name: 'Đĩa bay Frisbee', description: 'Đồ chơi vận động ngoài trời, giúp tăng cường thể lực cho chó.', price: 110000, imageUrl: 'https://images.unsplash.com/photo-1559909670-5807c40f5a28?q=80&w=800', category: 'Đồ chơi', stock: 38 },
    { id: 8, name: 'Bàn chải & kem đánh răng', description: 'Bộ sản phẩm chăm sóc răng miệng, giúp ngăn ngừa mảng bám.', price: 180000, imageUrl: 'https://images.unsplash.com/photo-1631998599443-c64293f94b3e?q=80&w=800', category: 'Dụng cụ chăm sóc', stock: 22 },
    { id: 9, name: 'Thẻ tên định danh', description: 'Thẻ tên bằng thép không gỉ, khắc laser thông tin liên hệ.', price: 100000, imageUrl: 'https://images.unsplash.com/photo-1588015764034-ccb9104c264a?q=80&w=800', category: 'Trang sức', stock: 75 },
    { id: 10, name: 'Nhà cây cho mèo', description: 'Nhà cây nhiều tầng với trụ cào móng và chỗ ngủ êm ái.', price: 850000, imageUrl: 'https://images.unsplash.com/photo-1592194522939-a05a586071a8?q=80&w=800', category: 'Dụng cụ chăm sóc', stock: 15 },
    { id: 11, name: 'Dây dắt tự động', description: 'Dây dắt có thể thu gọn, kèm đèn pin, tiện lợi cho việc đi dạo ban đêm.', price: 320000, imageUrl: 'https://images.unsplash.com/photo-1533283915092-4903a4533b66?q=80&w=800', category: 'Trang sức', stock: 18 },
    { id: 12, name: 'Đồ chơi tìm thức ăn', description: 'Giúp thú cưng phát triển trí tuệ và ăn chậm hơn, tốt cho tiêu hóa.', price: 210000, imageUrl: 'https://images.unsplash.com/photo-1621360039861-cd1ca836104e?q=80&w=800', category: 'Đồ chơi', stock: 40 },
];