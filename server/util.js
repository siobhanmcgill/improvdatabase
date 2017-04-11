module.exports = {

    smartUpdate: function (model, data, whitelist) {
        whitelist.forEach(name => {
            if (data[name] != undefined && data[name] != null) {
                model[name] = data[name];
            }
        });
        return model;
    },

    handleError: function (req, res, err) {
        console.error("Handle error:", err);
        res.status(500).json(err);
        throw new Error(err);
    },

    getObjectIdAsString: function (item) {
        if (typeof item == 'string') {
            return item;
        } else if (item._id && item._id.toString) {
            return item._id.toString();
        } else if (typeof item._id == 'string') {
            return item._id;
        } else if (item.toString) {
            return item.toString();
        } else {
            return ''; // ??
        }
    },

    /**
     * Inserts item into mongoose array of ObjectId items without causing duplicates
     * There might be a better way to do this with mongoose?
     */
    addToObjectIdArray: (array, itemToAdd) => {
        let existsAlready = false,
            itemToAddId = module.exports.getObjectIdAsString(itemToAdd);

        if (!array || !array.length) {
            array = [];
        }

        array.forEach(item => {
            let itemId = module.exports.getObjectIdAsString(item);
            if (itemId == itemToAddId) {
                existsAlready = true;
                return false;
            }
        });
        if (!existsAlready) {
            array.push(itemToAdd);
        }
        return array;
    },

    /**
     * Removes an item from an array of object ids
     * There might be an easier way to do this with mongoose?
     */
    removeFromObjectIdArray: (array, itemToRemove) => {
        let indexInArray = -1,
            itemToRemoveId = module.exports.getObjectIdAsString(itemToRemove);

        if (!array || !array.length) {
            // it isn't even array, so it sure doesn't contain the thing
            return [];
        }

        array.forEach((item, i) => {
            let itemId = module.exports.getObjectIdAsString(item);
            if (itemId == itemToRemoveId) {
                indexInArray = i;
                return false;
            }
        });
        if (indexInArray > -1) {
            array = array.splice(indexInArray, 1);
        }
        return array;
    }

}