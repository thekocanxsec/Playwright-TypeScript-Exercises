public class MultithreadedCounter extends Thread{
    @Override
    public void run(){
        for(int i = 0; i<= 10; i++){
            System.out.println(i);
            try{
                //Thread.sleep(100);
                Thread.sleep(0);
            }catch(InterruptedException e){
                throw new RuntimeException(e);
            }
        }

    }
}

class MainRun{
    public static void main(String[] args) {
        MultithreadedCounter mc1 = new MultithreadedCounter();
        MultithreadedCounter mc2 = new MultithreadedCounter();

        mc1.start();
        mc2.start();
    }
}
