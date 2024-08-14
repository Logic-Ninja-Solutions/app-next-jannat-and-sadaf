import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { bankAccount } from '../../../actions/order/constants'

export default function BankDetails() {
    return (
        <Card shadow="sm">
            <CardHeader>
                <p>Bank Account Details</p>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>
                    <strong>Bank:</strong> {bankAccount.bank}
                </p>
                <p>
                    <strong>Account Title:</strong> {bankAccount.title}
                </p>
                <p>
                    <strong>Account Number:</strong> {bankAccount.accountNumber}
                </p>
                <p>
                    <strong>Branch:</strong> {bankAccount.branch}
                </p>
                <p>
                    <strong>Branch Code:</strong> {bankAccount.branchCode}
                </p>
                <p>
                    <strong>IBAN:</strong> {bankAccount.iban}
                </p>
            </CardBody>
        </Card>
    )
}
