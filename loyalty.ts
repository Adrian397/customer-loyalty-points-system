class LoyaltyService {
    private customerPoints = new Map<string, number>();

    /**
     * Adds points to a customer's balance
     * @param customerId The ID of the customer
     * @param pointsToAdd The number of points to add
     */
    public earn(customerId: string, pointsToAdd: number): void {
        if (pointsToAdd <= 0) {
            console.error("Error: Points to earn must be a positive number.");
            return;
        }
        const currentPoints = this.customerPoints.get(customerId) || 0;
        const newBalance = currentPoints + pointsToAdd;
        this.customerPoints.set(customerId, newBalance);
        console.log(`Customer ${customerId} earned ${pointsToAdd} points. New balance: ${newBalance}.`);
    }

    /**
     * Redeems points from a customer's balance
     * @param customerId The ID of the customer
     * @param pointsToRedeem The number of points to redeem
     */
    public redeem(customerId: string, pointsToRedeem: number): void {
        if (pointsToRedeem <= 0) {
            console.error("Error: Points to redeem must be a positive number.");
            return;
        }

        const currentPoints = this.customerPoints.get(customerId) || 0;

        if (pointsToRedeem > currentPoints) {
            console.error(`Error: Customer ${customerId} has insufficient points. Balance: ${currentPoints}, attempted to redeem: ${pointsToRedeem}.`);
            return;
        }

        const newBalance = currentPoints - pointsToRedeem;
        this.customerPoints.set(customerId, newBalance);
        console.log(`Customer ${customerId} redeemed ${pointsToRedeem} points. New balance: ${newBalance}.`);

        if (newBalance < 10) {
            console.log(`Warning: Customer ${customerId} has a low balance: ${newBalance} points.`);
        }
    }
}

/**
 * Parses arguments and runs the main application logic.
 */
function main(): void {
    const args = process.argv.slice(2);

    if (args.length !== 3) {
        console.error("Invalid number of arguments.");
        console.error("Usage: ts-node loyalty.ts <earn|redeem> <customerId> <points>");
        return;
    }

    const [operation, customerId, pointsStr] = args;
    const points = parseInt(pointsStr, 10);

    if (isNaN(points)) {
        console.error("Error: Points must be a valid number.");
        return;
    }

    const loyaltyService = new LoyaltyService();

    switch (operation.toLowerCase()) {
        case 'earn':
            loyaltyService.earn(customerId, points);
            break;
        case 'redeem':
            loyaltyService.redeem(customerId, points);
            break;
        default:
            console.error(`Error: Unknown operation '${operation}'. Use 'earn' or 'redeem'.`);
            break;
    }
}

main();