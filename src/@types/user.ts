import { SortOrder } from ".";

export type UserSortField =
  | "full_name"
  | "email_address"
  | "phone_number"
  | "status"
  | "created_at"
  | "account_summary.balance"
  | "education_and_employment.loan_repayment"
  | "education_and_employment.max_monthly_income"
  | "bank.bank_name"
  | "loan_company.name";

export interface UsersQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: UserSortField;
  sortOrder?: SortOrder;
}
export type User = {
  id: string;
  full_name: string;
  phone_number: string | number;
  email_address: string;
  bvn: string | number;
  gender: "Male" | "Female";
  marital_status: string;
  children: string | number;
  type_of_residence: string;
  reference_id: string;
  status: "Active" | "Inactive" | "Blacklisted";
  created_at: string;

  account_summary: {
    user_tier: number;
    balance: number;
  };

  bank: {
    account_number: number;
    bank_name: string;
    account_name: string;
  };

  loan_company: {
    name: string;
  };

  education_and_employment: {
    level_of_education: string;
    employment_status: string;
    sector_of_employment: string;
    duration_of_employment: string;
    office_email: string;
    min_monthly_income: number;
    max_monthly_income: number;
    loan_repayment: number;
  };

  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };

  guarantors: Array<{
    full_name: string;
    phone_number: string | number;
    email_address: string;
    relationship: string;
  }>;
};
