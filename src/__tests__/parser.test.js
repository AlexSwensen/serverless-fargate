const parse = require('../parser');

test('minimal service task configuration', () => {
  const parsed = parse({
    vpc: {
      securityGroups: ['sg-1234'],
      subnets: ['subnet-1234'],
    },
    tasks: {
      'my-task': {
        image: 'my-image',
      },
    },
  });

  expect(parsed).toMatchSnapshot();
});

test('minimal scheduled task configuration', () => {
  const parsed = parse({
    vpc: {
      securityGroups: ['sg-1234'],
      subnets: ['subnet-1234'],
    },
    tasks: {
      'my-task': {
        image: 'my-image',
        schedule: 'rate(1 minute)',
      },
    },
  });

  expect(parsed).toMatchSnapshot();
});

test('full service task configuration', () => {
  const parsed = parse({
    memory: '1GB',
    cpu: 512,
    environment: {
      global: 'variable',
    },
    executionRoleArn: 'arn:aws:iam::123456:role/my-custom-execution-role',
    taskRoleArn: 'arn:aws:iam::123456:role/my-custom-task-role',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['resource:*'],
        Resource: '*',
      },
    ],
    iamManagedPolicies: ['arn:aws:iam::aws:policy/my-managed-policy'],
    vpc: {
      securityGroups: ['sg-1234'],
      subnets: ['subnet-1234'],
      assignPublicIp: false,
    },
    tags: {
      global: 'tag',
    },
    tasks: {
      'task-1': {
        name: 'my-task-1',
        image: 'my-image-1',
        executionRoleArn:
          'arn:aws:iam::123456:role/my-custom-execution-role-for-task-1',
        taskRoleArn: 'arn:aws:iam::123456:role/my-custom-task-role-for-task-1',
        vpc: {
          securityGroups: ['sg-5678'],
          subnets: ['subnet-5678'],
          assignPublicIp: true,
        },
        command: ['command'],
        entryPoint: ['entrypoint'],
        memory: '2GB',
        cpu: 1024,
        environment: {
          task: 'variable',
        },
        service: {
          desiredCount: 2,
          maximumPercent: 100,
          minimumHealthyPercent: 0,
          spot: true,
        },
        tags: {
          task: 'tag',
        },
      },
      'task-2': {
        image: 'my-image-2',
      },
    },
  });

  expect(parsed).toMatchSnapshot();
});
