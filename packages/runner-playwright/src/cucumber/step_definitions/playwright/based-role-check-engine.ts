/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2023 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://spdx.org/licenses/MIT.html
* or see the "LICENSE" file for more details.
*
* Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
* Software description: Make test writing fast, understandable by any human
* understanding English or French.
*/

import { key } from "@uuv/runner-commons";
import { Then, When } from "@cucumber/cucumber";
import {
    findWithRoleAndName,
    findWithRoleAndNameAndContent, findWithRoleAndNameAndContentDisable, findWithRoleAndNameAndContentEnable,
    notFoundWithRoleAndName,
    withinRoleAndName
} from "./core-engine";
import { World } from "../../preprocessor/run/world";

When(`${key.when.withinElement.roleAndName}`, async function (this: World, name: string) {
    return await withinRoleAndName(this, "$roleId", name);
});

Then(`${key.then.element.withRoleAndName}`, async function (this: World, name: string)  {
    await findWithRoleAndName(this, "$roleId", name);
});

Then(
    `${key.then.element.not.withRoleAndName}`,
    async function (this: World, name: string)  {
       await notFoundWithRoleAndName(this, "$roleId", name);
    }
);

Then(
    `${key.then.element.withRoleAndNameAndContent}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContent(this, "$roleId", name, expectedTextContent);
    }
);

Then(
    `${key.then.element.withRoleAndNameAndContentDisabled}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContentDisable(this, "$roleId", name, expectedTextContent);
    }
);

Then(
    `${key.then.element.withRoleAndNameAndContentEnabled}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContentEnable(this, "$roleId", name, expectedTextContent);
    }
);
