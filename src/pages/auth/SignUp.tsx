import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        // Mock registration
        setTimeout(() => {
            dispatch(setUser({
                id: `user-${Date.now()}`,
                name: formData.name,
                email: formData.email,
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
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Create account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="First and last name"
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="At least 6 characters"
                    />
                    <Input
                        label="Re-enter password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        error={error}
                    />

                    <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
                        Create your MarketPlace account
                    </Button>
                </form>

                <div className="mt-6 text-sm text-slate-600">
                    <p className="mb-4">
                        By creating an account, you agree to MarketPlace's <a href="#" className="text-blue-600 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Notice</a>.
                    </p>
                    <div className="border-t border-slate-300 pt-4 mt-4">
                        <p>
                            Already have an account? <Link to="/signin" className="text-blue-600 hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SignUp;
