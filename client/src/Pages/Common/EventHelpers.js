export function validPlanningStart(current, eventStart, eventEnd, planningEnd) {
    var valid = true;

    // Check that the project start is before the event start
    if(	(eventStart !== "") &&
        current.isAfter(eventStart)) {
        valid = false;
    }

    // Check that the project start is before the event end
    if(	(eventEnd !== "") &&
        current.isAfter(eventEnd)) {
        valid = false;
    }

    // Check that the project start is before the project end
    if(	(planningEnd !== "") &&
        current.isAfter(planningEnd)) {
        valid = false;
    }

    return valid;
}

export function validEventStart(planningStart, current, eventEnd, planningEnd) {
    var valid = true;

    // Check that the event start is after the project start
    if(	(planningStart !== "") &&
        current.isBefore(planningStart)) {
        valid = false;
    }

    // Check that the event start is before the event end
    if(	(eventEnd !== "") &&
        current.isAfter(eventEnd)) {
        valid = false;
    }

    // Check that the event start is before the project end
    if(	(planningEnd !== "") &&
        current.isAfter(planningEnd)) {
        valid = false;
    }

    return valid;
}

export function validEventEnd(planningStart, eventStart, current, planningEnd) {
    var valid = true;

    // Check that the event end is after the project start
    if(	(planningStart !== "") &&
        current.isBefore(planningStart)) {
        valid = false;
    }

    // Check that the event end is after the event start
    if(	(eventStart !== "") &&
        current.isBefore(eventStart)) {
        valid = false;
    }

    // Check that the event end is before the project end
    if(	(planningEnd !== "") &&
        current.isAfter(planningEnd)) {
        valid = false;
    }

    return valid;
}

export function validPlanningEnd(planningStart, eventStart, eventEnd, current) {
    var valid = true;

    // Check that the project end is after the project start
    if(	(planningStart !== "") &&
        current.isBefore(planningStart)) {
        valid = false;
    }

    // Check that the project end is after the event start
    if(	(eventStart !== "") &&
        current.isBefore(eventStart)) {
        valid = false;
    }

    // Check that the project end is after the event end
    if(	(eventEnd !== "") &&
        current.isBefore(eventEnd)) {
        valid = false;
    }

    return valid;
}
