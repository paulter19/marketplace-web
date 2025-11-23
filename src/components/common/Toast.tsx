import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { RootState } from '../../store';
import { hideToast } from '../../store/slices/uiSlice';

const Toast: React.FC = () => {
    const dispatch = useDispatch();
    const { toast } = useSelector((state: RootState) => state.ui);

    useEffect(() => {
        if (toast.isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.isVisible, dispatch]);

    if (!toast.isVisible) return null;

    const getIcon = () => {
        switch (toast.type) {
            case 'success': return <CheckCircle size={20} className="text-green-500" />;
            case 'error': return <AlertCircle size={20} className="text-red-500" />;
            default: return <Info size={20} className="text-blue-500" />;
        }
    };

    const getBgColor = () => {
        switch (toast.type) {
            case 'success': return 'bg-green-50 border-green-200';
            case 'error': return 'bg-red-50 border-red-200';
            default: return 'bg-blue-50 border-blue-200';
        }
    };

    return (
        <div className="fixed top-20 right-4 z-50 animate-fade-in-down">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${getBgColor()} min-w-[300px]`}>
                {getIcon()}
                <p className="flex-1 text-sm font-medium text-slate-800">{toast.message}</p>
                <button onClick={() => dispatch(hideToast())} className="text-slate-400 hover:text-slate-600">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Toast;
