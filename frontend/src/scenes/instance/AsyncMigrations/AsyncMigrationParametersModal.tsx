import React, { useState } from 'react'
import { useActions } from 'kea'
import { AsyncMigrationModalProps, asyncMigrationsLogic } from 'scenes/instance/AsyncMigrations/asyncMigrationsLogic'
import { LemonModal } from 'lib/components/LemonModal/LemonModal'
import { LemonButton } from 'lib/components/LemonButton'
import { asyncMigrationParameterFormLogic } from 'scenes/instance/AsyncMigrations/asyncMigrationParameterFormLogic'
import { Field, Form } from 'kea-forms'
import { LemonInput } from 'lib/components/LemonInput/LemonInput'
import { AnimatedCollapsible } from 'lib/components/AnimatedCollapsible'

export function AsyncMigrationParametersModal(props: AsyncMigrationModalProps): JSX.Element {
    const { closeAsyncMigrationsModal } = useActions(asyncMigrationsLogic)

    const [collapsed, setCollapsed] = useState(true)

    return (
        <Form
            logic={asyncMigrationParameterFormLogic}
            props={props}
            formKey="parameters"
            enableFormOnSubmit
            id="async-migration-parameters-form"
        >
            <LemonModal
                title="Advanced migration configuration"
                destroyOnClose
                onCancel={closeAsyncMigrationsModal}
                visible={true}
                footer={
                    <>
                        <LemonButton
                            form="async-migration-parameters-form"
                            type="secondary"
                            data-attr="async-migration-parameters-cancel"
                            className="mr-2"
                            onClick={closeAsyncMigrationsModal}
                        >
                            Cancel
                        </LemonButton>
                        <LemonButton
                            form="async-migration-parameters-form"
                            htmlType="submit"
                            type="primary"
                            data-attr="async-migration-parameters-submit"
                        >
                            Run migration
                        </LemonButton>
                    </>
                }
            >
                <p>
                    This async migration allows tuning parameters used in the async migration.
                    {collapsed && (
                        <>
                            <br />
                            <a
                                onClick={() => {
                                    setCollapsed(!collapsed)
                                }}
                            >
                                Click here to show advanced configuration.
                            </a>
                        </>
                    )}
                </p>

                <AnimatedCollapsible collapsed={collapsed}>
                    {Object.keys(props.migration.parameter_definitions).map((key) => (
                        <Field name={key} key={key} label={<>{props.migration.parameter_definitions[key][1]}</>}>
                            <LemonInput type="number" />
                        </Field>
                    ))}
                </AnimatedCollapsible>
            </LemonModal>
        </Form>
    )
}
