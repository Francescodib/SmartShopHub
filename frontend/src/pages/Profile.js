import React, { useEffect, useState } from 'react';
import { FiPackage, FiSettings, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../services/orderService';
import { updatePreferences } from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [consentToTracking, setConsentToTracking] = useState(user?.consentToTracking || false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(token);
        setOrders(data.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleUpdatePreferences = async () => {
    try {
      setUpdating(true);
      await updatePreferences(token, { consentToTracking });
      toast.success('Preferences updated successfully!');
      window.location.reload(); // Refresh to update user context
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="mb-4 pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiPackage />
                  <span>My Orders</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiSettings />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">My Orders</h2>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 text-center">
                    <FiPackage className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600">No orders yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {orders.map(order => (
                      <div key={order._id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Order ID: {order._id.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-700">
                                {item.product?.name || 'Product'} x {item.quantity}
                              </span>
                              <span className="font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-lg font-bold text-gray-900">
                            ${order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="tracking"
                      checked={consentToTracking}
                      onChange={(e) => setConsentToTracking(e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="tracking" className="font-medium text-gray-900 cursor-pointer">
                        Enable Personalized Recommendations
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        Allow us to track your browsing and purchase history to provide AI-powered
                        personalized product recommendations. Your data is processed securely and
                        in compliance with GDPR regulations.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleUpdatePreferences}
                    disabled={updating || consentToTracking === user?.consentToTracking}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? 'Updating...' : 'Save Preferences'}
                  </button>

                  {consentToTracking && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        ✨ Personalized recommendations are enabled! Our AI will learn from your
                        preferences to suggest products you'll love.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
