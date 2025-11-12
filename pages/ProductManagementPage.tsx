
import React, { useState } from 'react';
import { Product, InventoryLog } from '../types';
import ProductAdminPanel from '../components/ProductAdminPanel';
import InventoryManagementPanel from '../components/InventoryManagementPanel';
import ProductEditModal from '../components/ProductEditModal';
import InventoryModal from '../components/InventoryModal';
import { FaArrowLeft } from 'react-icons/fa';

interface ProductManagementPageProps {
  products: Product[];
  inventoryLogs: InventoryLog[];
  onCreateProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onUpdateStock: (productId: number, change: number) => void;
  onGoBack: () => void;
}

const ProductManagementPage: React.FC<ProductManagementPageProps> = ({
  products,
  inventoryLogs,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onGoBack,
}) => {
  const [isProductEditModalOpen, setIsProductEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [managingStockProduct, setManagingStockProduct] = useState<Product | null>(null);

  const handleOpenProductEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsProductEditModalOpen(true);
  };

  const handleOpenInventoryModal = (product: Product) => {
    setManagingStockProduct(product);
    setIsInventoryModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    onUpdateProduct(updatedProduct);
    setIsProductEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveStock = (productId: number, change: number) => {
    onUpdateStock(productId, change);
    setIsInventoryModalOpen(false);
    setManagingStockProduct(null);
  };
  
  return (
    <section id="product-management-page">
      <div className="flex items-center mb-8">
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-500 font-semibold"
        >
          <FaArrowLeft />
          Quay lại Bảng điều khiển
        </button>
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Quản lý Sản phẩm & Hàng tồn kho
      </h2>

      <div className="space-y-8">
        <ProductAdminPanel 
          products={products}
          onCreateProduct={onCreateProduct}
          onEditProduct={handleOpenProductEditModal}
          onDeleteProduct={onDeleteProduct}
          onManageStock={handleOpenInventoryModal}
        />
        <InventoryManagementPanel inventoryLogs={inventoryLogs} />
      </div>

      <ProductEditModal 
        isOpen={isProductEditModalOpen}
        onClose={() => setIsProductEditModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={() => setIsInventoryModalOpen(false)}
        product={managingStockProduct}
        onUpdateStock={handleSaveStock}
      />
    </section>
  );
};

export default ProductManagementPage;
