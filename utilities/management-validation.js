const { body, validationResult } = require("express-validator");
const utilities = require(".");
const inventoryModel = require("../models/inventory-model");

const renderErrorView = async (req, res, viewPath, data) => {
    const nav = await utilities.getNav();
    res.render(viewPath, { nav, ...data });
};

const validate = {};

validate.addClassificationRules = () => [
    body("classification_name")
        .trim()
        .isAlpha()
        .withMessage("Valid classification name is required. Follow the instruction")
        .isLength({ min: 1 })
        .withMessage("Classification name is required.")
        .custom(async (classification_name) => {
            const classificationExists = await inventoryModel.checkExistingClassification(classification_name);
            if (classificationExists) {
                throw new Error("Classification Exists. Please input another classification.");
            }
        }),
];

validate.addInventoryRules = () => [
    body("inv_make").trim().isLength({ min: 1 }).withMessage("Enter valid Make"),
    body("inv_model").trim().isLength({ min: 1 }).withMessage("Enter valid Model"),
    // Add other validation rules for inventory fields
];

validate.checkValidationResults = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return renderErrorView(req, res, "./path/to/error-view", { errors });
    }
    next();
};

validate.checkAddClassification = [validate.addClassificationRules(), validate.checkValidationResults];

validate.checkAddInventory = [validate.addInventoryRules(), validate.checkValidationResults];

validate.checkUpdateInventory = [
    validate.addInventoryRules(), // Assuming update uses similar rules as adding inventory
    validate.checkValidationResults,
];

module.exports = validate;
