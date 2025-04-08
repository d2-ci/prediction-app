import React, { useEffect, useState } from 'react'
import { CrudService, DataSetRead } from '@dhis2-chap/chap-lib';
import { Button, SingleSelectField, SingleSelectOption, CircularLoader, NoticeBox } from '@dhis2/ui';
import styles from './SelectDataset.module.css'
import i18n from "@dhis2/d2-i18n";

interface SelectDatasetProps {
  selectedDataset : DataSetRead | undefined
  setSelectedDataset : (d : DataSetRead | undefined) => void
}

const getFakeDatasetResponse = () => {
    return [
        {id: 0,
        name: 'Testdataset1',
        created: '2025-03-25',
        covariates: ['precipitation', 'disease']
        },
        {id: 1,
        name: 'Testdataset2',
        created: '2025-03-31',
        covariates: ['precipitation', 'temperature', 'population', 'disease']
        }
    ]
}

const SelectDataset = ({ selectedDataset, setSelectedDataset } : SelectDatasetProps) => {
    const [datasets, setDatasets] = useState<DataSetRead[]>([])
    const [isLoading, setIsLoading] = useState(true)
  
    const getDatasets = async () => {
        let datasets = getFakeDatasetResponse() // TODO: replace with actual url fetch
        datasets.sort((a, b) => {
            //return b.created.getTime() - a.created.getTime()
            if (a.created > b.created) {
                return -1
            } else {
                return 1
            }
        })
        setDatasets(datasets)
        setIsLoading(false)
    }

    const onChange = ({selected} : any) => {
        const dataset = datasets.find(d => JSON.stringify(d.id) === selected)
        setSelectedDataset(dataset)
    }

    useEffect(() => {
        getDatasets()
    }, [])
    
    return (
        <div className={styles.datasetSelectContainer}>
    
            {isLoading ? (
                <div className={styles.loadingText}>
                    <CircularLoader small />
                    Loading datasets...
                </div>
            ) : (
                <SingleSelectField
                    label="Select Dataset"
                    selected={JSON.stringify(selectedDataset?.id)}
                    onChange={onChange}
                >
                    {datasets.map(dataset => (
                        <SingleSelectOption
                            key={JSON.stringify(dataset.id)}
                            value={JSON.stringify(dataset.id)}
                            label={dataset.name + ' (' + dataset?.created + ')'}
                        />
                    ))}
                </SingleSelectField>
            )}
        </div>
    )
}

export default SelectDataset