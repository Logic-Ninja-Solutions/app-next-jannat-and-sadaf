import { Button, Grid, Image, Modal, Stack, Tabs, TextInput } from '@mantine/core';
import { IconRuler2, IconWoman } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './styles.module.scss';

interface CustomSizeModalProps {
  opened: boolean;
  close: () => void;
}

const frontImage = 'size_chart_front.png';
const backImage = 'size_chart_back.png';

export default function CustomSizeModal({ opened, close }: CustomSizeModalProps) {
  const frontSizes = [
    'Neck Path',
    'Sleeve Length',
    'Shirt Length',
    'Bust Circumference',
    'Waist',
    'Hip Circumference',
    'Thigh Circumference',
    'Knee Circumference',
    'Calf Circumference',
    'Ankle',
  ];

  const backSizes = ['Back Next Depth', 'Cross Shoulder', 'Trouser Length', 'Armhole', 'Bicep'];

  const [activeTab, setActiveTab] = useState<string | null>('front');

  return (
    <Modal size="lg" opened={opened} onClose={close} withCloseButton={false}>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="front" leftSection={<IconWoman />}>
            Front
          </Tabs.Tab>
          <Tabs.Tab value="back" leftSection={<IconRuler2 />}>
            Back
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="front">
          <Grid mt="md">
            <Grid.Col
              span={{
                xs: 12,
                md: 6,
              }}
            >
              <Image radius="md" className={classes.image} src={frontImage} />
            </Grid.Col>
            <Grid.Col
              span={{
                xs: 12,
                md: 6,
              }}
            >
              <Stack>
                {frontSizes.map((size, index) => (
                  <TextInput key={index} label={size} placeholder="Enter size" />
                ))}
                <Button
                  onClick={() => {
                    setActiveTab('back');
                  }}
                >
                  Next
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="back">
          <Grid mt="md">
            <Grid.Col
              span={{
                xs: 12,
                md: 6,
              }}
            >
              <Image radius="md" className={classes.image} src={backImage} />
            </Grid.Col>
            <Grid.Col
              span={{
                xs: 12,
                md: 6,
              }}
            >
              <Stack>
                {backSizes.map((size, index) => (
                  <TextInput key={index} label={size} placeholder="Enter size" />
                ))}
                <Button onClick={close}>Close</Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
