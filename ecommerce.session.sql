SELECT * FROM "User"
SELECT * FROM "Role"
SELECT * FROM "Vendor"
SELECT * FROM "Permission"
SELECT * FROM "RolePermission"
SELECT * FROM "UserVendorRole"

INSERT INTO "RolePermission" ("roleID", "permissionID") VALUES ('b8d698e6-e2cf-4e51-9d1f-a3c62b1eab16', 'd4c20d50-580d-44fb-8c1f-d5d6be3d426a')

INSERT INTO "Vendor" (
  "id", 
  "userID", 
  "name", 
  "slug", 
  "description", 
  "logoUrl", 
  "taxCode", 
  "totalProducts", 
  "totalOrders", 
  "status", 
  "createdAt", 
  "updatedAt"
)
VALUES (
  gen_random_uuid(), 
  '06181a0f-3a59-4937-956b-e76d735a24cf', 
  'Cửa hàng Điện máy Xanh', 
  'cua-hang-dien-may-xanh', 
  'Chuyên cung cấp đồ gia dụng và điện máy', 
  NULL, 
  '0123456789', 
  20, 
  100, 
  'active', 
  NOW(), 
  NOW()
);

INSERT INTO "UserVendorRole" ("id", "userID", "vendorID", "roleID") VALUES (gen_random_uuid(), '06181a0f-3a59-4937-956b-e76d735a24cf', 'ce2d0c27-0288-4b88-9d84-54d3cc81365f', 'b8d698e6-e2cf-4e51-9d1f-a3c62b1eab16')

