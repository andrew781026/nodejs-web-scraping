// import {func, elementType} from "prop-types";

const AllTaskComponentInUser = data => {

    const compare = data.map(item => Object.values(item)[0]);

    const result = compare.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
    });

    return result;
};

// 混和 , 新舊權限
const PermissionCheck = (permissionNow, permissionNew) => {
    if (permissionNew === null || permissionNew === "F") {
        permissionNow = "F";
    } else if (permissionNew === "R" && permissionNow !== "F") {
        permissionNow = "R";
    } else if (permissionNew === "N" && permissionNow === "") {
        permissionNow = "N";
    }
    return permissionNow;
};

const TaskPermissionCheck = componentStatus => {
    const taskIdList = AllTaskComponentInUser(componentStatus);

    console.log(componentStatus);
    console.log(taskIdList);

    const buttonPermissionList = [];
    taskIdList.map(taskId => {
        const buttonPermission = componentStatus.filter(function f(el) {
            return el.taskId === taskId;
        });
        let buttonStatus = "";
        if (buttonPermission.length > 0) {
            buttonPermission.map(props => {
                buttonStatus = PermissionCheck(buttonStatus, props.accessMode);
            });
        }

        console.log('taskId=', taskId);
        console.log('componentStatus=', componentStatus);
        console.log('buttonPermission=', buttonPermission);
        console.log('buttonStatus=', buttonStatus);

        const buttonPermissionCheck = componentStatus.filter(function f(el) {
            return el.taskId === taskId && el.accessMode === buttonStatus;
        });

        console.log('componentStatus=', componentStatus);
        console.log('buttonPermissionCheck=', buttonPermissionCheck);

        if (buttonPermissionCheck.length > 0) {
            buttonPermissionList.push(buttonPermissionCheck[0]);
        }
    });

    console.log(buttonPermissionList);

    return buttonPermissionList;
};

// accessMode :  null / F / R / N / ''
const permitData = [
    {taskId: 12, applicationCode: 'BAS011001M', taskName: 'BAS011001M_代碼清單維護', accessMode: 'R'}
];

const result = TaskPermissionCheck(permitData);
console.log('result=', result);


const afterAllTaskComponentInUser = AllTaskComponentInUser([
    {taskId: 1, applicationCode: 'BAS011001M', taskName: 'BAS011001M_代碼清單維護', accessMode: 'R'},
    {applicationCode: 'BAS011001M', taskId: 2, taskName: 'BAS011001M_代碼清單維護', accessMode: 'R'},
    {accessMode: 'R', taskId: 3, applicationCode: 'BAS011001M', taskName: 'BAS011001M_代碼清單維護'},
    {taskId: 4, applicationCode: 'BAS011001M', taskName: 'BAS011001M_代碼清單維護', accessMode: 'R'},
    {taskId: 5, applicationCode: 'BAS011001M', taskName: 'BAS011001M_代碼清單維護', accessMode: 'R'},
]);


const oldFunc = function (applicationCodeList, userMenu) {

    const data = [];

    applicationCodeList.map((prop) => {

        const children = userMenu.filter(function f(el) {
            return el.parentId === prop.codeUid;
        });

        console.log('children=', children);

        if (children.length !== 0) {
            const o = {};
            o.menuId = prop.codeId;
            o.menuName = prop.codeName;
            o.children = children;
            o.children.map((pro) => {

                const child = userMenu.filter(ele => ele.parentId === pro.menuId);

                console.log('child=', child);

                if (child.length !== 0) {
                    pro.children = child;
                }

                return pro;
            });
            // console.log(o);
            data.push(o);
        }
    });

    return data;
};


const newFunc = function (applicationCodeList, userMenu) {

    const data = applicationCodeList.map((applicationCode) => {

        // firstLevelUserMenu
        const firstLevelUserMenu = userMenu.filter(userMenuItem => userMenuItem.parentId === applicationCode.codeUid);

        // secondLevelUserMenu
        const secondLevelUserMenu = firstLevelUserMenu.map((firstLevelUserMenuItem) => {

            const child = userMenu.filter(ele => ele.parentId === firstLevelUserMenuItem.menuId);

            console.log('child=', child);

            if (child.length !== 0) {
                firstLevelUserMenuItem.children = child;
            }

            return firstLevelUserMenuItem;
        });

        console.log('children=', firstLevelUserMenu);

        if (firstLevelUserMenu.length === 0) return null;
        else {

            const newChild = firstLevelUserMenu.map(userMenuItem => {

                const child = userMenu.filter(ele => ele.parentId === userMenuItem.menuId);

                if (child.length !== 0) {
                    userMenuItem.children = child;
                }

                return userMenuItem;
            });

            return {
                menuId: applicationCode.codeId,
                menuName: applicationCode.codeName,
                children: newChild
            };
        }


        if (firstLevelUserMenu.length !== 0) {
            const o = {};
            o.menuId = applicationCode.codeId;
            o.menuName = applicationCode.codeName;
            o.children = firstLevelUserMenu;
            o.children.map((pro) => {

                const child = userMenu.filter(ele => ele.parentId === pro.menuId);

                console.log('child=', child);

                if (child.length !== 0) {
                    pro.children = child;
                }

                return pro;
            });
            // console.log(o);
            data.push(o);
        }
    });

    return data;
};

console.log('afterAllTaskComponentInUser=', afterAllTaskComponentInUser);