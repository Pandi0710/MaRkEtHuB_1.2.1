import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import Card from '../../components/seller/Card';
import Button from '../../components/seller/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import api from '../../lib/api';

const mockProducts = [
  { id: '1', name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 5099.99, stock: 45, status: 'active', createdAt: '2024-01-15T10:30:00Z', images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'], description: 'High-quality wireless headphones with noise cancellation', sku: 'WBH-001' },
  { id: '2', name: 'Smart Fitness Watch', category: 'Electronics', price: 10599.99, stock: 23, status: 'active', createdAt: '2024-01-14T09:15:00Z', images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'], description: 'Track your fitness and health with style', sku: 'SFW-200' },
  { id: '3', name: 'Portable laptop Stand', category: 'Accessories', price: 3449.99, stock: 0, status: 'inactive', createdAt: '2024-01-13T14:22:00Z', images: ['https://images.pexels.com/photos/4482896/pexels-photo-4482896.jpeg'], description: 'Ergonomic and foldable laptop stand', sku: 'PLS-010' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Try fetching from backend first
        try {
          const data = await api.get(`/products/${id}`);
          setProduct(data || null);
          return;
        } catch (e) {
          // fallback to local
        }

        const raw = localStorage.getItem('sellerProducts');
        const saved = raw ? JSON.parse(raw) : [];
        const all = Array.isArray(saved) && saved.length > 0 ? saved : mockProducts;
        const found = all.find(p => String(p.id) === String(id));
        setProduct(found || null);
      } catch {
        const found = mockProducts.find(p => String(p.id) === String(id));
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded-lg"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Link to="/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Product Not Found</h1>
            <p className="text-gray-600">The product you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
            <p className="text-gray-600">View product details</p>
          </div>
        </div>
        <Link to={`/products/edit/${product.id}`}>
          <Button><Edit className="w-4 h-4 mr-2" />Edit</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(product.images && product.images.length > 0 ? product.images : ['https://via.placeholder.com/600x400?text=No+Image']).map((url, idx) => (
                <img key={idx} src={url} alt={`Image ${idx + 1}`} className="w-full h-64 object-cover rounded-lg border border-gray-200" />
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{product.description || 'No description provided.'}</p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="font-medium">{product.category || '-'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">SKU</span><span className="font-medium">{product.sku || '-'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Price</span><span className="font-medium">{formatCurrency(product.price)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Stock</span><span className={`font-medium ${product.stock === 0 ? 'text-red-600' : product.stock < 10 ? 'text-yellow-600' : 'text-green-600'}`}>{product.stock}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-medium capitalize">{product.status}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Created</span><span className="font-medium">{formatDate(product.createdAt)}</span></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
