"use server"

import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";
import { handleError } from "../utils";

export const createCategory = async ({ categoryName }: {categoryName: string}) => {
    try {
        await connectToDatabase();

        const category = await Category.findOne({ name: categoryName });
        if (category) {
            throw new Error("Category Already Exists");
        }

        const newCategory = await Category.create({ name: categoryName });

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error);
    }
}

export const getAllCategories = async () => {
    try {
        await connectToDatabase();

        const category = await Category.find();

        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        handleError(error);
    }
}