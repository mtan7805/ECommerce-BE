import { UserStatus, VendorStatus, UserVendorRoleStatus, ProductStatus, OrderStatus, AddressType, PromotionStatus, PromotionType, PaymentStatus, PaymentType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: undefined,
    fullAddress: faker.lorem.words(5),
    city: undefined,
    province: undefined,
    country: undefined,
    phone: undefined,
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: undefined,
    fullAddress: faker.lorem.words(5),
    city: undefined,
    province: undefined,
    country: undefined,
    phone: undefined,
    status: UserStatus.active,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeVendor() {
  return {
    name: faker.person.fullName(),
    slug: faker.lorem.words(5),
    description: undefined,
    logoUrl: undefined,
    taxCode: undefined,
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeVendorComplete() {
  return {
    id: faker.string.uuid(),
    userID: faker.string.uuid(),
    name: faker.person.fullName(),
    slug: faker.lorem.words(5),
    description: undefined,
    logoUrl: undefined,
    taxCode: undefined,
    totalProducts: 0,
    totalOrders: 0,
    status: VendorStatus.active,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeRole() {
  return {
    name: faker.person.fullName(),
    description: undefined,
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeRoleComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    description: undefined,
    isSystemRole: false,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakePermission() {
  return {
    name: faker.person.fullName(),
    description: undefined,
    key: faker.lorem.words(5),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakePermissionComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    description: undefined,
    key: faker.lorem.words(5),
    isSystemPermission: false,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeRolePermission() {
  return {
    createdBy: undefined,
  };
}
export function fakeRolePermissionComplete() {
  return {
    roleID: faker.string.uuid(),
    permissionID: faker.string.uuid(),
    createdAt: new Date(),
    createdBy: undefined,
  };
}
export function fakeUserVendorRole() {
  return {
    createdBy: undefined,
  };
}
export function fakeUserVendorRoleComplete() {
  return {
    id: faker.string.uuid(),
    userID: faker.string.uuid(),
    vendorID: faker.string.uuid(),
    roleID: faker.string.uuid(),
    status: UserVendorRoleStatus.active,
    createdAt: new Date(),
    createdBy: undefined,
  };
}
export function fakeCategory() {
  return {
    name: faker.person.fullName(),
    slug: faker.lorem.words(5),
    description: undefined,
    imageUrl: undefined,
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeCategoryComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    slug: faker.lorem.words(5),
    description: undefined,
    parentID: undefined,
    imageUrl: undefined,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeProduct() {
  return {
    name: faker.person.fullName(),
    slug: faker.lorem.words(5),
    description: undefined,
    sku: undefined,
    price: new Decimal(faker.number.float()),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeProductComplete() {
  return {
    id: faker.string.uuid(),
    vendorID: faker.string.uuid(),
    name: faker.person.fullName(),
    slug: faker.lorem.words(5),
    description: undefined,
    sku: undefined,
    price: new Decimal(faker.number.float()),
    stockQuantity: 0,
    status: ProductStatus.draft,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeProductVariant() {
  return {
    name: undefined,
    sku: undefined,
    price: new Decimal(faker.number.float()),
    attributes: undefined,
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeProductVariantComplete() {
  return {
    id: faker.string.uuid(),
    productID: faker.string.uuid(),
    name: undefined,
    sku: undefined,
    price: new Decimal(faker.number.float()),
    stockQuantity: 0,
    attributes: undefined,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeProductCategoryComplete() {
  return {
    productID: faker.string.uuid(),
    categoryID: faker.string.uuid(),
  };
}
export function fakeProductImage() {
  return {
    name: faker.person.fullName(),
    description: undefined,
    imageUrl: faker.image.url(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeProductImageComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    description: undefined,
    productID: undefined,
    productVariantID: undefined,
    imageUrl: faker.image.url(),
    sortOrder: 0,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeOrder() {
  return {
    orderNumber: faker.lorem.words(5),
    subtotal: new Decimal(faker.number.float()),
    totalAmount: new Decimal(faker.number.float()),
    notes: undefined,
    shippedAt: undefined,
    deliveredAt: undefined,
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeOrderComplete() {
  return {
    id: faker.string.uuid(),
    orderNumber: faker.lorem.words(5),
    userID: faker.string.uuid(),
    status: OrderStatus.pending,
    subtotal: new Decimal(faker.number.float()),
    taxAmount: new Decimal(0),
    shippingAmount: new Decimal(0),
    discountAmount: new Decimal(0),
    totalAmount: new Decimal(faker.number.float()),
    currency: 'VND',
    notes: undefined,
    shippedAt: undefined,
    deliveredAt: undefined,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeOrderItem() {
  return {
    unitPrice: new Decimal(faker.number.float()),
    totalPrice: new Decimal(faker.number.float()),
    productVariantSnapshot: undefined,
  };
}
export function fakeOrderItemComplete() {
  return {
    id: faker.string.uuid(),
    orderID: faker.string.uuid(),
    productVariantID: faker.string.uuid(),
    quantity: 1,
    unitPrice: new Decimal(faker.number.float()),
    totalPrice: new Decimal(faker.number.float()),
    productVariantSnapshot: undefined,
  };
}
export function fakeOrderAddress() {
  return {
    firstName: faker.person.firstName(),
    lastName: undefined,
    company: undefined,
    fullAddress: faker.lorem.words(5),
    city: undefined,
    province: undefined,
    country: undefined,
    phone: faker.lorem.words(5),
  };
}
export function fakeOrderAddressComplete() {
  return {
    id: faker.string.uuid(),
    orderID: faker.string.uuid(),
    type: AddressType.shipping,
    firstName: faker.person.firstName(),
    lastName: undefined,
    company: undefined,
    fullAddress: faker.lorem.words(5),
    city: undefined,
    province: undefined,
    country: undefined,
    phone: faker.lorem.words(5),
  };
}
export function fakePromotion() {
  return {
    code: faker.lorem.words(5),
    name: faker.person.fullName(),
    description: undefined,
    value: new Decimal(faker.number.float()),
    usageLimit: undefined,
    endDate: undefined,
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakePromotionComplete() {
  return {
    id: faker.string.uuid(),
    code: faker.lorem.words(5),
    name: faker.person.fullName(),
    description: undefined,
    type: PromotionType.percentage,
    value: new Decimal(faker.number.float()),
    usageLimit: undefined,
    startDate: new Date(),
    endDate: undefined,
    status: PromotionStatus.inactive,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakeOrderPromotionComplete() {
  return {
    id: faker.string.uuid(),
    orderID: faker.string.uuid(),
    promotionID: faker.string.uuid(),
    discountAmount: new Decimal(0),
  };
}
export function fakeCart() {
  return {
    updatedAt: faker.date.anytime(),
  };
}
export function fakeCartComplete() {
  return {
    id: faker.string.uuid(),
    userID: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeCartItem() {
  return {
    updatedAt: faker.date.anytime(),
  };
}
export function fakeCartItemComplete() {
  return {
    id: faker.string.uuid(),
    cartID: faker.string.uuid(),
    productVariantID: faker.string.uuid(),
    quantity: 1,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeNotification() {
  return {
    title: faker.lorem.words(5),
    message: faker.lorem.words(5),
  };
}
export function fakeNotificationComplete() {
  return {
    id: faker.string.uuid(),
    userID: faker.string.uuid(),
    title: faker.lorem.words(5),
    message: faker.lorem.words(5),
    isRead: false,
  };
}
export function fakePayment() {
  return {
    type: faker.helpers.arrayElement([PaymentType.creditCard, PaymentType.bankTransfer, PaymentType.eWallet] as const),
    status: faker.helpers.arrayElement([PaymentStatus.pending, PaymentStatus.completed, PaymentStatus.failed, PaymentStatus.refunded] as const),
    amount: new Decimal(faker.number.float()),
    transactionID: undefined,
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
export function fakePaymentComplete() {
  return {
    id: faker.string.uuid(),
    orderID: faker.string.uuid(),
    type: faker.helpers.arrayElement([PaymentType.creditCard, PaymentType.bankTransfer, PaymentType.eWallet] as const),
    status: faker.helpers.arrayElement([PaymentStatus.pending, PaymentStatus.completed, PaymentStatus.failed, PaymentStatus.refunded] as const),
    amount: new Decimal(faker.number.float()),
    transactionID: undefined,
    createdAt: new Date(),
    createdBy: undefined,
    updatedAt: faker.date.anytime(),
    deletedAt: undefined,
  };
}
