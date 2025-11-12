







import React, { useState, useEffect } from 'react';
import { FaPaw, FaUser, FaSignOutAlt, FaSun, FaMoon, FaStar, FaQuoteLeft, FaBoxOpen } from 'react-icons/fa';

import { Service, User, Appointment, TeamMember, Testimonial, Product, Sale, InventoryLog } from './types';
import { SERVICES, USERS, APPOINTMENTS, TEAM_MEMBERS, TESTIMONIALS, PRODUCTS } from './constants';

import LoginModal from './components/LoginModal';
import BookingModal from './components/BookingModal';
import ServiceCard from './components/ServiceCard';
import UserAdminPanel from './components/UserAdminPanel';
import AppointmentDetailModal from './components/AppointmentDetailModal';
import AppointmentViewModal from './components/AppointmentViewModal';
import UserAppointments from './components/UserAppointments';
import TeamCard from './components/TeamCard';
import TeamEditModal from './components/TeamEditModal';
import UserEditModal from './components/UserEditModal';
import Pagination from './components/Pagination';
import LocationHours from './components/LocationHours';
import ScrollToTopButton from './components/ScrollToTopButton';
import ProductCard from './components/ProductCard';
import SalesDashboard from './components/SalesDashboard';
import ProductDetailModal from './components/ProductDetailModal';
import ProductManagementPage from './pages/ProductManagementPage';


const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col h-full">
        <FaQuoteLeft className="text-teal-400 dark:text-teal-500 text-2xl mb-4" />
        <p className="text-gray-600 dark:text-gray-300 italic mb-4 flex-grow">"{testimonial.quote}"</p>
        <div className="mt-auto">
             <div className="flex items-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                ))}
            </div>
            <p className="font-bold text-gray-800 dark:text-white">{testimonial.author}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.petInfo}</p>
        </div>
    </div>
);


// Fix: Implement the main App component. This file was previously empty.
function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [users, setUsers] = useState<User[]>(USERS);
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [testimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [sales, setSales] = useState<Sale[]>([]);
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>([]);


  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAppointmentDetailModalOpen, setIsAppointmentDetailModalOpen] = useState(false);
  const [isAppointmentViewModalOpen, setIsAppointmentViewModalOpen] = useState(false);
  const [isTeamEditModalOpen, setIsTeamEditModalOpen] = useState(false);
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);

  
  // Selected items state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [lastBookedAppointment, setLastBookedAppointment] = useState<Appointment | null>(null);
  const [viewingAppointment, setViewingAppointment] = useState<Appointment | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);


  // Pagination & Filter States
  const [shopCurrentPage, setShopCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;
  const [selectedProductCategory, setSelectedProductCategory] = useState('Tất cả');

  // Admin View State
  const [activeAdminView, setActiveAdminView] = useState<'dashboard' | 'products'>('dashboard');
  
  const isAdmin = currentUser?.role === 'admin';
  const canManage = currentUser?.role === 'admin' || currentUser?.role === 'quanly';

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const handleScrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const handleLogin = (username: string, passwordHash: string) => {
    const user = users.find(u => u.username === username && u.passwordHash === passwordHash);
    if (user) {
      setCurrentUser(user);
      setIsLoginModalOpen(false);
      setActiveAdminView('dashboard'); // Reset to dashboard on login
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleOpenBooking = (service: Service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleBook = async (bookingDetails: {
    ownerName: string;
    petName: string;
    petType: 'Chó' | 'Mèo' | 'Khác';
    appointmentDate: string;
    serviceId: number;
    serviceName: string;
    userId: number;
  }) => {
    const newAppointment: Appointment = {
      id: appointments.length + 1,
      status: 'Đã xác nhận',
      ...bookingDetails,
    };
    setAppointments(prev => [...prev, newAppointment]);
    setLastBookedAppointment(newAppointment);
    setIsBookingModalOpen(false);
    setIsAppointmentDetailModalOpen(true);
  };
  
  const handleUpdatePrice = (serviceId: number, newPrice: number) => {
    setServices(services.map(s => s.id === serviceId ? { ...s, price: newPrice } : s));
  };

  const handleCreateUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      id: users.length + 1,
      ...user
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleCreateProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...product
    };
    setProducts(prev => [newProduct, ...prev]);
  };
  
  const handleViewAppointment = (appointment: Appointment) => {
    setViewingAppointment(appointment);
    setIsAppointmentViewModalOpen(true);
  };
  
  const handleUpdateStatus = (appointmentId: number, status: Appointment['status']) => {
    setAppointments(prev => prev.map(app => app.id === appointmentId ? { ...app, status } : app));
    setIsAppointmentViewModalOpen(false);
    setViewingAppointment(null);
  };

  const handleOpenTeamEditModal = (member: TeamMember) => {
    setEditingTeamMember(member);
    setIsTeamEditModalOpen(true);
  };
  
  const handleUpdateTeamMember = (updatedMember: TeamMember) => {
    setTeamMembers(prev => prev.map(member => member.id === updatedMember.id ? updatedMember : member));
    setIsTeamEditModalOpen(false);
    setEditingTeamMember(null);
  };

  const handleOpenUserEditModal = (user: User) => {
    setEditingUser(user);
    setIsUserEditModalOpen(true);
  };
  
  const handleUpdateUserPassword = (userId: number, newPasswordHash: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, passwordHash: newPasswordHash } : u));
    setIsUserEditModalOpen(false);
    setEditingUser(null);
  };

    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const handleDeleteProduct = (productId: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
            setProducts(prev => prev.filter(p => p.id !== productId));
        }
    };

    const handlePurchaseProduct = (productId: number) => {
        let purchasedProduct: Product | undefined;
        let finalStock = 0;

        setProducts(currentProducts => {
            const newProducts = currentProducts.map(p => {
                if (p.id === productId && p.stock > 0) {
                    finalStock = p.stock - 1;
                    purchasedProduct = { ...p, stock: finalStock };
                    return purchasedProduct;
                }
                return p;
            });
            return newProducts;
        });

        if (purchasedProduct) {
            const newSale: Sale = {
                id: sales.length + 1,
                productId: purchasedProduct.id,
                productName: purchasedProduct.name,
                quantity: 1,
                pricePerItem: purchasedProduct.price,
                totalPrice: purchasedProduct.price,
                saleDate: new Date().toISOString()
            };
            setSales(prev => [...prev, newSale]);
            
            const newLog: InventoryLog = {
                id: inventoryLogs.length + 1,
                productId: purchasedProduct.id,
                productName: purchasedProduct.name,
                type: 'Bán hàng',
                quantityChange: 1,
                stockAfter: finalStock,
                date: new Date().toISOString()
            };
            setInventoryLogs(prev => [newLog, ...prev]);

            alert(`Đã mua thành công "${purchasedProduct.name}"!`);
            setIsProductDetailModalOpen(false); // Close detail modal on successful purchase
        }
    };
    
    const handleUpdateStock = (productId: number, change: number) => {
        let updatedProduct: Product | undefined;

        setProducts(currentProducts => 
            currentProducts.map(p => {
                if (p.id === productId) {
                    updatedProduct = { ...p, stock: Math.max(0, p.stock + change) };
                    return updatedProduct;
                }
                return p;
            })
        );

        if (updatedProduct) {
             const newLog: InventoryLog = {
                id: inventoryLogs.length + 1,
                productId: updatedProduct.id,
                productName: updatedProduct.name,
                type: change > 0 ? 'Nhập kho' : 'Xuất kho',
                quantityChange: Math.abs(change),
                stockAfter: updatedProduct.stock,
                date: new Date().toISOString()
            };
            setInventoryLogs(prev => [newLog, ...prev]);
        }
    };

    const handleViewProductDetail = (product: Product) => {
        setSelectedProductForDetail(product);
        setIsProductDetailModalOpen(true);
    };

    const handleCloseProductDetail = () => {
        setIsProductDetailModalOpen(false);
    };


  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
  const userAppointments = currentUser ? sortedAppointments.filter(app => app.userId === currentUser.id) : [];

  const productCategories = ['Tất cả', ...Array.from(new Set(products.map(p => p.category)))];

  const handleProductCategoryChange = (category: string) => {
    setSelectedProductCategory(category);
    setShopCurrentPage(1); // Reset to first page on filter change
  };


  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#hero" className="flex items-center cursor-pointer">
            <FaPaw className="text-teal-500 text-3xl mr-2" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">PetCare Clinic</span>
          </a>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-500 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800">
              {theme === 'light' ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
            </button>
            {currentUser ? (
              <>
                <span className="font-semibold dark:text-gray-200">Chào, {currentUser.username}!</span>
                <button onClick={handleLogout} className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-500">
                  <FaSignOutAlt /> Đăng xuất
                </button>
              </>
            ) : (
              <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center gap-1 bg-teal-500 text-white font-bold py-2 px-4 rounded-full hover:bg-teal-600">
                <FaUser /> Đăng nhập
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        
        {canManage ? (
            activeAdminView === 'dashboard' ? (
                <section id="admin-dashboard" className="mb-12">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Bảng điều khiển</h2>
                    <div className="space-y-8">
                        <SalesDashboard sales={sales} formatPrice={formatPrice} />
                        {isAdmin && <UserAdminPanel users={users} onCreateUser={handleCreateUser} onEditUser={handleOpenUserEditModal} />}
                        
                        <div 
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" 
                            onClick={() => setActiveAdminView('products')}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => { if(e.key === 'Enter' || e.key === ' ') setActiveAdminView('products')}}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                                    <FaBoxOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Quản lý Sản phẩm & Tồn kho</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Xem, thêm, sửa, xóa sản phẩm và quản lý hàng tồn kho.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quản lý lịch hẹn</h3>
                            <div className="max-h-96 overflow-y-auto">
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {sortedAppointments.length > 0 ? sortedAppointments.map(app => (
                                    <li key={app.id} className="py-3 px-2 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold dark:text-gray-200">{app.serviceName} - {app.petName} ({app.ownerName})</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(app.appointmentDate).toLocaleDateString('vi-VN')}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            app.status === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                                            app.status === 'Đã hủy' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                        }`}>{app.status}</span>
                                        <button
                                            onClick={() => handleViewAppointment(app)}
                                            className="bg-teal-500 text-white font-bold py-1 px-3 rounded-full hover:bg-teal-600 text-xs transition-colors duration-200"
                                        >
                                            Chi tiết
                                        </button>
                                    </div>
                                    </li>
                                )) : <p className="text-center text-gray-500 dark:text-gray-400 py-4">Chưa có lịch hẹn nào.</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <ProductManagementPage
                    products={products}
                    inventoryLogs={inventoryLogs}
                    onCreateProduct={handleCreateProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                    onUpdateStock={handleUpdateStock}
                    onGoBack={() => setActiveAdminView('dashboard')}
                />
            )
        ) : (
             <>
                <section id="hero" className="text-center bg-gradient-to-br from-teal-500 to-green-500 text-white p-8 md:p-12 rounded-lg mb-12 shadow-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Chăm sóc toàn diện cho thú cưng</h1>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">Chúng tôi cung cấp các dịch vụ thú y chất lượng cao với đội ngũ bác sĩ tận tâm.</p>
                    <button 
                        onClick={handleScrollToServices}
                        className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg transform hover:scale-105"
                    >
                        Xem dịch vụ
                    </button>
                </section>

                {currentUser && <UserAppointments appointments={userAppointments} onViewAppointment={handleViewAppointment} />}

                <section id="services" className="py-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Dịch vụ của chúng tôi</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map(service => (
                        <ServiceCard 
                            key={service.id} 
                            service={service} 
                            isAdmin={canManage}
                            onBook={handleOpenBooking}
                            onUpdatePrice={handleUpdatePrice}
                            formatPrice={formatPrice}
                        />
                        ))}
                    </div>
                </section>

                <section id="shop" className="py-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Cửa hàng thú cưng</h2>
                    <div className="flex justify-center flex-wrap gap-2 mb-8">
                        {productCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleProductCategoryChange(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                    selectedProductCategory === category
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    {(() => {
                        const filteredProducts = selectedProductCategory === 'Tất cả'
                            ? products
                            : products.filter(p => p.category === selectedProductCategory);
                        
                        const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
                        const indexOfLastProduct = shopCurrentPage * PRODUCTS_PER_PAGE;
                        const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
                        const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

                        return (
                            <>
                                {currentProducts.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {currentProducts.map(product => (
                                            <ProductCard 
                                                key={product.id} 
                                                product={product} 
                                                formatPrice={formatPrice} 
                                                onPurchase={handlePurchaseProduct}
                                                onViewDetails={handleViewProductDetail} 
                                            />
                                        ))}
                                    </div>
                                ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Không tìm thấy sản phẩm nào trong danh mục này.</p>
                                )}
                                {totalPages > 1 && (
                                    <div className="mt-12">
                                        <Pagination
                                            currentPage={shopCurrentPage}
                                            totalPages={totalPages}
                                            onPageChange={setShopCurrentPage}
                                        />
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </section>
                
                <section id="team" className="py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Gặp gỡ đội ngũ của chúng tôi</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                    {teamMembers.map(member => (
                        <TeamCard 
                        key={member.id} 
                        member={member} 
                        isAdmin={canManage}
                        onEdit={handleOpenTeamEditModal}
                        />
                    ))}
                    </div>
                </div>
                </section>

                <section id="testimonials" className="py-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Khách hàng nói gì về chúng tôi</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map(testimonial => (
                                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                            ))}
                        </div>
                    </div>
                </section>

                <LocationHours />
            </>
        )}
      </main>

      <ScrollToTopButton />

      <footer className="bg-gray-800 dark:bg-black text-white mt-12 py-6">
        <div className="container mx-auto text-center">
            <p>&copy; 2024 PetCare Clinic. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        service={selectedService}
        currentUser={currentUser}
        onBook={handleBook}
      />
      <AppointmentDetailModal 
        isOpen={isAppointmentDetailModalOpen}
        onClose={() => setIsAppointmentDetailModalOpen(false)}
        appointment={lastBookedAppointment}
      />
      <AppointmentViewModal 
        isOpen={isAppointmentViewModalOpen}
        onClose={() => setIsAppointmentViewModalOpen(false)}
        appointment={viewingAppointment}
        currentUser={currentUser}
        onUpdateStatus={handleUpdateStatus}
      />
       <TeamEditModal 
        isOpen={isTeamEditModalOpen}
        onClose={() => setIsTeamEditModalOpen(false)}
        member={editingTeamMember}
        onSave={handleUpdateTeamMember}
      />
       <UserEditModal 
        isOpen={isUserEditModalOpen}
        onClose={() => setIsUserEditModalOpen(false)}
        user={editingUser}
        onSetPassword={handleUpdateUserPassword}
      />
      <ProductDetailModal
        isOpen={isProductDetailModalOpen}
        onClose={handleCloseProductDetail}
        product={selectedProductForDetail}
        formatPrice={formatPrice}
        onPurchase={handlePurchaseProduct}
      />
    </div>
  );
}

export default App;