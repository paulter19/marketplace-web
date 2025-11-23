import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold mb-4">Get to Know Us</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><a href="#" className="hover:underline">Careers</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                            <li><a href="#" className="hover:underline">About MarketPlace</a></li>
                            <li><a href="#" className="hover:underline">Investor Relations</a></li>
                            <li><a href="#" className="hover:underline">MarketPlace Devices</a></li>
                            <li><a href="#" className="hover:underline">MarketPlace Science</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Make Money with Us</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><a href="#" className="hover:underline">Sell products on MarketPlace</a></li>
                            <li><a href="#" className="hover:underline">Sell on MarketPlace Business</a></li>
                            <li><a href="#" className="hover:underline">Sell apps on MarketPlace</a></li>
                            <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
                            <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
                            <li><a href="#" className="hover:underline">Self-Publish with Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">MarketPlace Payment Products</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><a href="#" className="hover:underline">MarketPlace Business Card</a></li>
                            <li><a href="#" className="hover:underline">Shop with Points</a></li>
                            <li><a href="#" className="hover:underline">Reload Your Balance</a></li>
                            <li><a href="#" className="hover:underline">MarketPlace Currency Converter</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Let Us Help You</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            <li><a href="#" className="hover:underline">MarketPlace and COVID-19</a></li>
                            <li><a href="#" className="hover:underline">Your Account</a></li>
                            <li><a href="#" className="hover:underline">Your Orders</a></li>
                            <li><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
                            <li><a href="#" className="hover:underline">Returns & Replacements</a></li>
                            <li><a href="#" className="hover:underline">Manage Your Content and Devices</a></li>
                            <li><a href="#" className="hover:underline">Help</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
                    <p>&copy; {new Date().getFullYear()} MarketPlace, Inc. or its affiliates</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
