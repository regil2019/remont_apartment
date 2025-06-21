// src/data/serviceData.js
import { FaHome, FaPaintRoller, FaPencilRuler } from "react-icons/fa";

export const serviceData = [
  {
    id: 1,
    title: "Ремонты квартиры",
    description: "Мы поможем вам отремонтировать ваш дом, чтобы воплотить в жизнь ваше видение.",
    features: ["Полный цикл работ", "Качественные материалы", "Соблюдение сроков"],
    category: "ремонт",
    image: "/images/service1.jpg",
    icon: FaHome,
  },
  {
    id: 2,
    title: "Дизайн интерьера",
    description: "Создайте красивое и функциональное пространство с помощью наших экспертов-дизайнеров.",
    features: ["3D визуализация", "Подбор материалов", "Авторский надзор"],
    category: "дизайн",
    image: "/images/service2.jpg",
    icon: FaPencilRuler,
  },
  {
    id: 3,
    title: "Отделочные работы",
    description: "Высококачественная отделка придаст вашему дому элегантность.",
    features: ["Стены и потолки", "Напольные покрытия", "Декоративные элементы"],
    category: "отделка",
    image: "/images/service3.jpg",
    icon: FaPaintRoller,
  },
];
