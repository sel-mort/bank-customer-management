export interface Customer {
    id: number;
    accountNumber: number;
    firstName: string;
    lastName: string;
    gender: "Male" | "Female";
    email: string;
    phone: string;
    address: string;
    accountType: "savings" | "checking";
    balance: number;
    status: string;
};