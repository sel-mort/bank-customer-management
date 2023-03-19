interface Name {
    firstName: string;
    lastName: string;
};

export interface Customer {
    id: number;
    accountNumber: number;
    name: Name;
    gender: "Male" | "Female";
    email: string;
    phone: string;
    address: string;
    type: "savings" | "checking";
    balance: bigint;
    status: string;
};