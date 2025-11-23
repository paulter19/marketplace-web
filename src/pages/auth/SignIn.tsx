import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock login
        setTimeout(() => {
            dispatch(setUser({
                id: 'user-1',
                name: 'Demo User',
                email: email,
                isAdmin: false
            }));
            setIsLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Link to="/" className="text-3xl font-bold flex items-center gap-2 text-slate-900">
                    <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center text-slate-900 font-bold">M</div>
                    MarketPlace
                </Link>
            </div>

            <Card className="w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Sign in</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Email or mobile phone number"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-sm text-slate-600">
                    <p className="mb-4">
                        By continuing, you agree to MarketPlace's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.
                    </p>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">New to MarketPlace?</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link to="/signup">
                            <Button variant="secondary" className="w-full">Create your MarketPlace account</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SignIn;
