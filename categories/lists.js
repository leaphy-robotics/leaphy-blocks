import { Variables } from "blockly/core";

class List {
    /**
     *
     * @param id { string }
     * @param name { string }
     */
    constructor(id, name) {
        this.type = "Number";

        this.id = id;
        this.name = name;
    }
}

class ListManager {
    constructor() {
        this.lists = {};
    }

    /**
     *
     * @param workspace { Blockly.Workspace }
     * @param name { string }
     */
    addList(workspace, name) {
        const id = crypto.randomUUID();
        this.lists[id] = new List(id, name);
    }

    /**
     *
     * @param id { string }
     * @returns { List }
     */
    getList(id) {
        return this.lists[id];
    }

    /**
     *
     * @returns {List[]}
     */
    getLists() {
        return Object.values(this.lists);
    }

    /**
     *
     * @param id { string }
     * @param newName { string }
     */
    renameList(id, newName) {
        this.lists[id].name = newName;
    }

    /**
     *
     * @param id { string }
     */
    deleteList(id) {
        delete this.lists[id];
    }
}

export const listManager = new ListManager();
const INDEX_PREFILL = {
    INDEX: {
        block: {
            type: "math_number",
            fields: {
                NUM: 0
            }
        }
    }
}

export default function(workspace) {
    let blockList = [];
    blockList.push({
        kind: 'button',
        text: 'Create List',
        callbackKey: 'create_list',
    });

    const lists = listManager.getLists();
    if (lists.length > 0) {
        const dynamicBlocks = [
            { kind: 'block', type: 'lists_add' },
            { kind: 'block', type: 'lists_delete', inputs: INDEX_PREFILL },
            { kind: 'sep', gap: 8 },
            { kind: 'block', type: 'lists_insert', inputs: INDEX_PREFILL },
            { kind: 'sep', gap: 8 },
            { kind: 'block', type: 'lists_replace', inputs: INDEX_PREFILL },
            { kind: 'block', type: 'lists_get', inputs: INDEX_PREFILL },
            { kind: 'sep', gap: 8 },
            { kind: 'block', type: 'lists_length' },
        ]

        blockList = blockList.concat(dynamicBlocks)
    }


    workspace.registerButtonCallback('create_list', function(button) {
        Variables.promptName('create_list', '', (name) => {
            listManager.addList(workspace, name);
            workspace.refreshToolboxSelection();
        });
    });

    return blockList;
};
